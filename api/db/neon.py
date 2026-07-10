import os
import uuid as _uuid
import datetime as _datetime
import psycopg2
import psycopg2.extras
import psycopg2.pool

_pool: psycopg2.pool.ThreadedConnectionPool | None = None


def _get_pool() -> psycopg2.pool.ThreadedConnectionPool:
    global _pool
    if _pool is None:
        dsn = os.getenv("DATABASE_URL")
        if not dsn:
            raise RuntimeError("DATABASE_URL must be set")
        _pool = psycopg2.pool.ThreadedConnectionPool(1, 10, dsn)
    return _pool


class _Conn:
    """Borrows a connection from the pool; commits on clean exit, rolls back on exception."""
    def __enter__(self):
        self._conn = _get_pool().getconn()
        return self._conn

    def __exit__(self, exc_type, *_):
        if exc_type:
            self._conn.rollback()
        else:
            self._conn.commit()
        _get_pool().putconn(self._conn)


def get_conn() -> _Conn:
    return _Conn()


def to_dict(row) -> dict:
    """Convert a RealDictRow to a plain dict with JSON-safe values."""
    result = {}
    for k, v in row.items():
        if isinstance(v, _uuid.UUID):
            result[k] = str(v)
        elif isinstance(v, (_datetime.datetime, _datetime.date)):
            result[k] = v.isoformat()
        else:
            result[k] = v
    return result


def vec_str(embedding: list[float]) -> str:
    """Serialize an embedding list to pgvector's bracketed string format."""
    return "[" + ",".join(str(x) for x in embedding) + "]"

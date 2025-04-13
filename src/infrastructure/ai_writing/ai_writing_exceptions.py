from typing import Any


class ReportGenerationError(Exception):
    def __init__(self, msg: str, errors: Any = None):
        super().__init__(msg)
        self.errors = errors


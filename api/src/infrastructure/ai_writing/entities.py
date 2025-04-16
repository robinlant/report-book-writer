from dataclasses import Field
from typing import Annotated
from wsgiref.validate import validator

from pydantic import BaseModel, field_validator
from pydantic.types import constr

class ReportEntity(BaseModel):
    week_days: list[list[constr(max_length=250)]]
    specialization: constr(max_length=100)
    is_school_week: bool



    @field_validator("week_days", mode='before')
    @classmethod
    def validate_week_days(cls, week_days: list[list[str]]) ->  list[list[str]]:
        if len(week_days) != 5:
            raise ValueError("ReportEntity must have 5 week_days")

        for wd in week_days:
            if len(wd) > 5:
                raise ValueError("Week days must have not more than 5 entries")

        return week_days

class UsageEntity(BaseModel):
    model: constr(max_length=100)
    prompt_tokens: int
    completion_tokens: int
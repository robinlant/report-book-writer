FROM python:3.12

WORKDIR /api

COPY api/requirements.txt .

RUN python -m pip install -r requirements.txt

COPY api .

EXPOSE 8000

RUN useradd -m container

RUN chown -R container:container /api

USER container

WORKDIR /api

CMD ["fastapi", "run", "src/main.py"]
from pathlib import Path
from dataclasses import dataclass


@dataclass
class Chunk:
    source: str
    content: str


def load_knowledge_base() -> list[Chunk]:
    kb_path = Path(__file__).parent.parent.parent / "knowledge_base"
    chunks = []

    for file in sorted(kb_path.glob("*.md")):
        content = file.read_text(encoding="utf-8")
        sections = content.split("\n## ")
        for i, section in enumerate(sections):
            text = section.strip()
            if i > 0:
                text = "## " + text
            if len(text) > 80:
                chunks.append(Chunk(source=file.name, content=text))

    print(f"[RAG] {len(chunks)} chunks cargados de {len(list(kb_path.glob('*.md')))} documentos")
    return chunks

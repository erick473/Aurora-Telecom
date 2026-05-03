from sentence_transformers import SentenceTransformer
from .loader import Chunk, load_knowledge_base
import numpy as np

# modelo multilingüe, entiende español, corre localmente sin costo
_model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")


class RAGIndex:
    def __init__(self):
        self.chunks: list[Chunk] = []
        self.embeddings: np.ndarray | None = None

    def build(self):
        self.chunks = load_knowledge_base()
        texts = [c.content for c in self.chunks]
        self.embeddings = _model.encode(texts, show_progress_bar=True)
        print(f"[RAG] Índice neuronal construido. Shape: {self.embeddings.shape}")

    def embed_query(self, query: str) -> np.ndarray:
        return _model.encode([query])[0]


rag_index = RAGIndex()

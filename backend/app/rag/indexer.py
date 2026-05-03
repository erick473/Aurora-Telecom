from sklearn.feature_extraction.text import TfidfVectorizer
from .loader import Chunk, load_knowledge_base


class RAGIndex:
    def __init__(self):
        self.chunks: list[Chunk] = []
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 2),
            min_df=1,
            analyzer="word",
            strip_accents="unicode"
        )
        self.matrix = None

    def build(self):
        self.chunks = load_knowledge_base()
        texts = [c.content for c in self.chunks]
        self.matrix = self.vectorizer.fit_transform(texts)
        print(f"[RAG] Índice TF-IDF construido. Shape: {self.matrix.shape}")


rag_index = RAGIndex()

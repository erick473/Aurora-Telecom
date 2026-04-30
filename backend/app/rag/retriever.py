from sklearn.metrics.pairwise import cosine_similarity
from .indexer import rag_index

MIN_SCORE = 0.05


def retrieve(query: str, top_k: int = 3) -> list[dict]:
    """
    Recupera chunks relevantes usando TF-IDF + cosine similarity.
    TF-IDF elegido porque los docs de Aurora usan terminología específica
    y consistente (nombres de planes, precios, colonias). Captura bien
    keywords exactas sin necesidad de embeddings semánticos costosos.
    """
    query_vec = rag_index.vectorizer.transform([query])
    scores = cosine_similarity(query_vec, rag_index.matrix).flatten()

    top_indices = scores.argsort()[::-1][:top_k]
    results = []

    for idx in top_indices:
        score = float(scores[idx])
        if score > MIN_SCORE:
            results.append({
                "source": rag_index.chunks[idx].source,
                "content": rag_index.chunks[idx].content,
                "score": round(score, 4)
            })

    return results

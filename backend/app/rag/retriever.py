from sklearn.metrics.pairwise import cosine_similarity
from .indexer import rag_index

MIN_SCORE = 0.3  # umbral más alto porque embeddings neuronales producen scores más confiables


def retrieve(query: str, top_k: int = 3) -> list[dict]:
    query_vec = rag_index.embed_query(query).reshape(1, -1)
    scores = cosine_similarity(query_vec, rag_index.embeddings).flatten()

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

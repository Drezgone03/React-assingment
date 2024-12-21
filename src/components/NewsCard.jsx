import React from "react";
import "./NewsCard.css";

export default function NewsCard({ newsItem }) {
  return (
    <div className="news-card">
      <div className="news-header">
        <span className="news-source">{newsItem.source}</span>
        {newsItem.trending && <span className="trending-badge">Trending</span>}
      </div>
      <div className="image-line"></div>
      <div className="news-image">
        <img src={newsItem.imageUrl} alt={newsItem.title} />
      </div>
      <div className="image-line"></div>
      <div className="news-title">{newsItem.title}</div>
      <button className="open-btn">Open</button>
    </div>
  );
}

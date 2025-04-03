"use client";

import { useState } from "react";
import axios from "axios";
import styles from"@/app/styles/home.module.css";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    try {
      const response = await axios.post("http://localhost:5000/api/shorten", { longUrl });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    }).catch(err => {
      alert("Failed to copy URL.");
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>URL Shortener</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="url"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Shorten URL
        </button>
      </form>

      {shortUrl && (
        <div className={styles.shortUrlContainer}>
          <p>Shortened URL:</p>
          <div className="flex items-center">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shortUrl}
            >
              {shortUrl}
            </a>
            <button
              onClick={() => copyToClipboard(shortUrl)}
              className={styles.copyButton}
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

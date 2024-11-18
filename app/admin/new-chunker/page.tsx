"use client";

import { useState } from "react";

export default function NewChunker() {
  const [newChunkerTitle, setNewChunkerTitle] = useState("");
  const [newChunkerSlug, setNewChunkerSlug] = useState("");

  const handleNewChunkerTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewChunkerTitle(e.target.value);
  };

  const handleNewChunkerSlugChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewChunkerSlug(e.target.value);
  };

  const submitNewChunkerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="w-full flex items-center flex-col gap-5 p-5">
      <h1>New Chunker</h1>
      <form
        className="flex flex-col gap-5 items-center"
        onSubmit={submitNewChunkerHandler}
      >
        <input
          type="text"
          placeholder="title"
          className="w-full py-4 px-6 text-lg text-slate-50 bg-slate-800 border-2 border-solid border-slate-600 focus:outline-none"
          value={newChunkerTitle}
          onChange={handleNewChunkerTitleChange}
        />
        <input
          type="text"
          placeholder="slug"
          className="w-full py-4 px-6 text-lg text-slate-50 bg-slate-800 border-2 border-solid border-slate-600 focus:outline-none"
          value={newChunkerSlug}
          onChange={handleNewChunkerSlugChange}
        />
        <button
          type="submit"
          className="rounded-md py-3 px-5 text-slate-50 text-xl bg-blue-500 hover:bg-blue-600"
        >
          CREATE CHUNKER
        </button>
      </form>
    </main>
  );
}

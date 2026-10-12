'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEYS = {
  COMPLETED: 'sde_drill_completed_v1',
  BOOKMARKED: 'sde_drill_bookmarked_v1',
  NOTES: 'sde_drill_notes_v1',
};

export function useRevisionProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const storedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED);
      if (storedCompleted) {
        setCompleted(new Set(JSON.parse(storedCompleted)));
      }

      const storedBookmarked = localStorage.getItem(STORAGE_KEYS.BOOKMARKED);
      if (storedBookmarked) {
        setBookmarked(new Set(JSON.parse(storedBookmarked)));
      }

      const storedNotes = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (e) {
      console.error('Failed to load drill progress from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleCompleted = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(Array.from(next)));
      } catch (err) {
        console.error('Failed to persist completed status:', err);
      }
      return next;
    });
  }, []);

  const toggleBookmarked = useCallback((id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(STORAGE_KEYS.BOOKMARKED, JSON.stringify(Array.from(next)));
      } catch (err) {
        console.error('Failed to persist bookmark:', err);
      }
      return next;
    });
  }, []);

  const saveNote = useCallback((id: string, noteText: string) => {
    setNotes((prev) => {
      const next = { ...prev, [id]: noteText };
      try {
        localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to persist notes:', err);
      }
      return next;
    });
  }, []);

  const resetAllProgress = useCallback(() => {
    if (typeof window !== 'undefined' && window.confirm('Reset all completed topics and bookmarks? This cannot be undone.')) {
      setCompleted(new Set());
      setBookmarked(new Set());
      setNotes({});
      localStorage.removeItem(STORAGE_KEYS.COMPLETED);
      localStorage.removeItem(STORAGE_KEYS.BOOKMARKED);
      localStorage.removeItem(STORAGE_KEYS.NOTES);
    }
  }, []);

  const exportBackup = useCallback(() => {
    const backup = {
      version: 1,
      timestamp: new Date().toISOString(),
      completed: Array.from(completed),
      bookmarked: Array.from(bookmarked),
      notes,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sde-drill-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [completed, bookmarked, notes]);

  return {
    isLoaded,
    completedCount: completed.size,
    isCompleted: (id: string) => completed.has(id),
    toggleCompleted,
    isBookmarked: (id: string) => bookmarked.has(id),
    toggleBookmarked,
    notes,
    saveNote,
    resetAllProgress,
    exportBackup,
  };
}

"use client";

import { useEffect } from "react";
import { markPageVisited } from "../lib/progress";

export function TrackPageVisit({
  lessonSlug,
  topicSlug,
  page,
}: {
  lessonSlug: string;
  topicSlug: string;
  page: number;
}) {
  useEffect(() => {
    markPageVisited(lessonSlug, topicSlug, page);
  }, [lessonSlug, topicSlug, page]);
  return null;
}

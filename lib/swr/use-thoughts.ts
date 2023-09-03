'use client'

import useSWR from "swr";

import { fetcher } from "@/lib/utils";
import { Thought } from "@/@types/thought";

export default function useThoughts() {

  const { data: thoughts, isValidating } = useSWR<
    (Thought)[]
  >(`/api/thoughts`, fetcher, {
    // disable this because it keeps refreshing the state of the modal when its open
    revalidateOnFocus: false,
    dedupingInterval: 30000,
  });

  return {
    thoughts,
    loading: thoughts ? false : true,
    isValidating,
  };
}
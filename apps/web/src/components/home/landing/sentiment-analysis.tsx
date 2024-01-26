export function SentimentAnalysis() {
  return (
    <div className="p-10 lg:w-1/3 lg:space-y-7 grid md:grid-cols-2 md:grid-rows-2 gap-4 lg:block place-items-center">
      <div className="p-6 py-2 col-span-2 sm:col-span-1 shadow-red-500/30 shadow-lg rounded-xl bg-card/70 backdrop-blur ring-1 ring-inset ring-red-900">
        Today, I had a car accident. Fortunately, there were no serious injuries, but my vehicle suffered significant
        damage. The situation was stressful and frustrating, and I&apos;m dealing with bureaucratic procedures for
        insurance. This incident has had a negative impact on my day and my mood.
      </div>
      <div className="p-6 py-2 col-span-2 sm:col-span-1 lg:ml-20 lg:w-[calc(100%+5rem)] shadow-yellow-600/30 shadow-lg rounded-xl bg-card/70 backdrop-blur ring-1 ring-inset ring-yellow-500">
        While walking in the city, I ran into an old friend I hadn&apos;t seen in years. It was a wonderful surprise. We
        sat in a café, reminisced about old times, and caught up on our lives. The conversation and companionship were
        so comforting that I felt extremely positive by the end of the day.
      </div>
      <div className="p-6 py-2 col-span-2 lg:ml-10 lg:w-[calc(100%+2.5rem)] shadow-lg shadow-emerald-500/30 rounded-xl bg-card/70 backdrop-blur ring-1 ring-inset ring-emerald-600">
        I spent the afternoon taking a walk in the park. The weather was pleasant, and people were enjoying the
        outdoors. I watched children playing in the park and people walking their dogs. It was a peaceful and relaxing
        experience, without any significant excitement, just a moment of tranquility in the midst of nature.
      </div>
    </div>
  )
}

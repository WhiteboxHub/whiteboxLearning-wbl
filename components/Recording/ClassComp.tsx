"use client";
import React, { useState, useEffect } from "react";

interface Video {
  vedioid: any;
  id: number;
  batchname: string;
  classdate: string;
  course: string;
  description: string;
  filename: string;
  forallcourses: string;
  link: string;
  status: string;
  subject: string | null;
  subjectid: number | null;
  type: string;
  videoid: string;
}

interface Batch {
  batchname: string;
  name: string;
}

export default function ClassComp() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [recordings, setRecordings] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Optional: Loading state

  useEffect(() => {
    fetchBatches();
    fetchRecordings(selectedBatch);
  }, []);

  useEffect(() => {
    if (selectedBatch) {
      fetchRecordings(selectedBatch);
    }
  }, [selectedBatch]);
  const fetchBatches = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      setIsLoading(true); // Set loading state

      const response = await fetch(`http://localhost:8000/recording`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch batches");
      }

      const data = await response.json();
      setBatches(data.batches);

      // Select the latest batch by default
      if (data.batches.length > 0) {
        setSelectedBatch(data.batches[0].batchname); // Assuming batches are sorted by some criteria
      }

      setIsLoading(false); // Clear loading state
    } catch (error) {
      console.error("Error fetching batches:", error);
      setIsLoading(false); // Clear loading state on error
    }
  };

  const fetchRecordings = async (batch: string) => {
    console.log(batch);

    try {
      const response = await fetch(
        `http://localhost:8000/recording?batchname=${batch}`,
        {
          headers: {
            // Authorization: `Bearer ${yourAuthToken}`, // Add your authorization token if required
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recordings");
      }
      const data = await response.json();
      if (!data.batch_recordings) {
        throw new Error("Failed to fetch recordings");
      }
      console.log(response);
      console.log(data.batch_recordings);
      setRecordings(data.batch_recordings); // Ensure this matches the actual response structure
    } catch (error) {
      console.error("Error fetching recordings:", error);
    }
  };

  const handleBatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBatch(e.target.value);
    setSelectedVideo(selectedVideo);
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const selected = recordings.find(
      (recording) => recording.id === selectedId
    );
    setSelectedVideo(selected || null);
  };

  const renderVideoPlayer = (video: Video) => {
    if (video.link.includes("youtu.be") || video.link.includes("youtube.com")) {
      const youtubeId = video.videoid;
      console.log(youtubeId);

      const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeId}`;
      return (
        <iframe
          width="100%"
          height="250"
          src={youtubeEmbedUrl}
          title={video.description}
          frameBorder="0"
          allowFullScreen
          className="rounded-xl border-2 border-gray-500"
        ></iframe>
      );
    } else {
      return <video src={video.link} controls className="mb-2 w-full" />;
    }
  };

  return (
    <div className="ml-4 flex-grow space-y-4">
      <div className="flex flex-grow flex-col">
        <label htmlFor="dropdown1">Batch:</label>
        <select
          id="dropdown1"
          className="rounded-md border border-gray-300 px-2 py-1 text-black dark:bg-white"
          value={selectedBatch}
          onChange={handleBatchChange}
        >
          {isLoading ? (
            <option disabled>Loading batches...</option>
          ) : (
            <>
              {batches.map((batch) => (
                <option key={batch.name} value={batch.batchname}>
                  {batch.batchname}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <div className="flex flex-grow flex-col">
        <label htmlFor="dropdown2">Recordings:</label>
        <select
          id="dropdown2"
          className="rounded-md border border-gray-300 px-2 py-1 text-black dark:bg-white"
          onChange={handleVideoSelect}
          // disabled={!selectedBatch}
        >
          {/* <option value="">Please Select the Topic...</option> */}
          {isLoading ? (
            <option disabled>Loading recordings...</option>
          ) : (
            <>
              {recordings.map((recording) => (
                <option key={recording.id} value={String(recording.id)}>
                  {recording.description}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      {selectedVideo && <div>{renderVideoPlayer(selectedVideo)}</div>}
    </div>
  );
}

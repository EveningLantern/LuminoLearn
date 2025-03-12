
import { ForumData, ForumTitles } from "@/types/forum";

// Sample messages by forum ID
export const sampleMessages: ForumData = {
  math: [
    {
      id: 1,
      authorId: "student-1",
      authorName: "Alex Thompson",
      content: "Can someone explain how to solve this calculus problem?",
      timestamp: "2023-06-15T10:30:00Z"
    },
    {
      id: 2,
      authorId: "student-2",
      authorName: "Jamie Wilson",
      content: "Sure! First, you need to find the derivative of the function...",
      timestamp: "2023-06-15T10:35:00Z"
    },
    {
      id: 3,
      authorId: "student-3",
      authorName: "Riley Chen",
      content: "I would also recommend looking at this example from chapter 4...",
      timestamp: "2023-06-15T10:40:00Z"
    }
  ],
  physics: [
    {
      id: 1,
      authorId: "student-4",
      authorName: "Morgan Lee",
      content: "I'm struggling with understanding the concept of angular momentum. Any tips?",
      timestamp: "2023-06-16T14:20:00Z"
    },
    {
      id: 2,
      authorId: "student-5",
      authorName: "Jordan Smith",
      content: "Think of it as the rotational equivalent of linear momentum. It's conserved in systems with no external torque.",
      timestamp: "2023-06-16T14:25:00Z"
    }
  ],
  chemistry: [
    {
      id: 1,
      authorId: "student-6",
      authorName: "Taylor Patel",
      content: "Can someone explain the difference between SN1 and SN2 reactions?",
      timestamp: "2023-06-17T09:10:00Z"
    },
    {
      id: 2,
      authorId: "student-2",
      authorName: "Jamie Wilson",
      content: "SN1 reactions happen in two steps with a carbocation intermediate, while SN2 reactions happen in one step with backside attack.",
      timestamp: "2023-06-17T09:15:00Z"
    }
  ]
};

// Forum titles by ID
export const forumTitles: ForumTitles = {
  math: "Mathematics Forum",
  physics: "Physics Forum",
  chemistry: "Chemistry Forum"
};

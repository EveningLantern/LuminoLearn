
// Sample teacher data
export const teachers = [
  {
    id: 1,
    name: "Dr. Smith",
    subject: "Mathematics",
    image: "/placeholder.svg",
    description: "Ph.D. in Mathematics with 10+ years of teaching experience",
    batches: ["Morning-Math-101", "Evening-Math-Advanced"]
  },
  {
    id: 2,
    name: "Prof. Johnson",
    subject: "Physics",
    image: "/placeholder.svg",
    description: "Specialized in Quantum Physics and Modern Physics concepts",
    batches: ["Afternoon-Physics-102", "Evening-Physics-Advanced"]
  },
  {
    id: 3,
    name: "Ms. Williams",
    subject: "Chemistry",
    image: "/placeholder.svg",
    description: "Expert in Organic Chemistry and Biochemistry",
    batches: ["Morning-Chemistry-101", "Afternoon-Chemistry-Lab"]
  },
  {
    id: 4,
    name: "Mr. Davis",
    subject: "Computer Science",
    image: "/placeholder.svg", 
    description: "Specializes in Programming and Data Structures",
    batches: ["Morning-CS-Basics", "Evening-CS-Advanced"]
  }
];

// Sample student data grouped by batches
export const studentBatches = {
  "Morning-Math-101": [
    { id: 1, name: "Alex Johnson", submissions: 2 },
    { id: 2, name: "Emma Wilson", submissions: 1 },
    { id: 3, name: "James Smith", submissions: 0 },
  ],
  "Evening-Math-Advanced": [
    { id: 4, name: "Sophia Brown", submissions: 3 },
    { id: 5, name: "Noah Davis", submissions: 1 },
  ],
  "Afternoon-Physics-102": [
    { id: 6, name: "Olivia Martin", submissions: 2 },
    { id: 7, name: "William Thompson", submissions: 0 },
  ],
  "Evening-Physics-Advanced": [
    { id: 8, name: "Charlotte Garcia", submissions: 1 },
    { id: 9, name: "Liam Rodriguez", submissions: 4 },
  ],
  "Morning-Chemistry-101": [
    { id: 10, name: "Amelia Martinez", submissions: 2 },
    { id: 11, name: "Benjamin Anderson", submissions: 1 },
  ],
  "Afternoon-Chemistry-Lab": [
    { id: 12, name: "Isabella Thomas", submissions: 3 },
    { id: 13, name: "Lucas White", submissions: 0 },
  ],
  "Morning-CS-Basics": [
    { id: 14, name: "Mia Harris", submissions: 1 },
    { id: 15, name: "Ethan Clark", submissions: 2 },
  ],
  "Evening-CS-Advanced": [
    { id: 16, name: "Harper Lewis", submissions: 4 },
    { id: 17, name: "Mason Walker", submissions: 1 },
  ]
};

// Sample submissions data
export const submissions = [
  { id: 1, studentId: 1, batchName: "Morning-Math-101", fileName: "Alex_Johnson_Morning-Math-101_Assignment1.pdf", submittedAt: "2023-10-10T10:30:00" },
  { id: 2, studentId: 1, batchName: "Morning-Math-101", fileName: "Alex_Johnson_Morning-Math-101_Assignment2.pdf", submittedAt: "2023-10-15T14:45:00" },
  { id: 3, studentId: 2, batchName: "Morning-Math-101", fileName: "Emma_Wilson_Morning-Math-101_Project.pdf", submittedAt: "2023-10-12T09:15:00" },
  { id: 4, studentId: 4, batchName: "Evening-Math-Advanced", fileName: "Sophia_Brown_Evening-Math-Advanced_Homework1.pdf", submittedAt: "2023-10-11T16:20:00" },
  { id: 5, studentId: 4, batchName: "Evening-Math-Advanced", fileName: "Sophia_Brown_Evening-Math-Advanced_Homework2.pdf", submittedAt: "2023-10-13T17:30:00" },
  { id: 6, studentId: 4, batchName: "Evening-Math-Advanced", fileName: "Sophia_Brown_Evening-Math-Advanced_Project.pdf", submittedAt: "2023-10-16T18:45:00" },
  { id: 7, studentId: 5, batchName: "Evening-Math-Advanced", fileName: "Noah_Davis_Evening-Math-Advanced_Assignment.pdf", submittedAt: "2023-10-14T15:10:00" },
];

// Sample chat messages between teachers and students
export const sampleChats = {
  "student-teacher-1": [
    {
      id: 1,
      senderId: "student-1",
      senderName: "Alex Johnson",
      content: "Hello Dr. Smith, I'm having trouble understanding integration by parts. Could you help me?",
      timestamp: "2023-10-15T14:30:00",
      isAI: false
    },
    {
      id: 2,
      senderId: "ai",
      senderName: "AI Assistant",
      content: "While you wait for Dr. Smith, I can help explain integration by parts. It's a technique used when you have a product of functions to integrate. The formula is: ∫u(x)v'(x)dx = u(x)v(x) - ∫u'(x)v(x)dx. Would you like me to walk through an example?",
      timestamp: "2023-10-15T14:31:00",
      isAI: true
    },
    {
      id: 3,
      senderId: "student-1",
      senderName: "Alex Johnson",
      content: "Yes, please! I'm specifically stuck on this problem: ∫x·ln(x)dx",
      timestamp: "2023-10-15T14:33:00",
      isAI: false
    },
    {
      id: 4,
      senderId: "ai",
      senderName: "AI Assistant",
      content: "Great! Let's apply integration by parts to ∫x·ln(x)dx.\n\nStep 1: Identify u(x) and v'(x).\nLet u(x) = ln(x) and v'(x) = x, so u'(x) = 1/x and v(x) = x²/2.\n\nStep 2: Apply the formula.\n∫x·ln(x)dx = ln(x) · (x²/2) - ∫(1/x) · (x²/2)dx\n= (x²·ln(x))/2 - ∫(x/2)dx\n= (x²·ln(x))/2 - x²/4 + C\n\nSo the answer is: ∫x·ln(x)dx = (x²·ln(x))/2 - x²/4 + C",
      timestamp: "2023-10-15T14:34:00",
      isAI: true
    },
    {
      id: 5,
      senderId: "teacher-1",
      senderName: "Dr. Smith",
      content: "That's correct! The AI explanation is spot on. Alex, just remember that integration by parts is most useful when you have a product of functions and one of them becomes simpler when differentiated. Do you have any other questions?",
      timestamp: "2023-10-15T14:40:00",
      isAI: false
    }
  ],
  "student-teacher-2": [
    {
      id: 1,
      senderId: "student-10",
      senderName: "Amelia Martinez",
      content: "Ms. Williams, I'm confused about balancing redox reactions in acidic solutions. Can you help?",
      timestamp: "2023-10-16T10:15:00",
      isAI: false
    },
    {
      id: 2,
      senderId: "ai",
      senderName: "AI Assistant",
      content: "While you wait for Ms. Williams, I can help with balancing redox reactions in acidic solutions. The key steps are: 1) Write the unbalanced equation, 2) Split into half-reactions, 3) Balance elements other than H and O, 4) Balance O with H₂O, 5) Balance H with H⁺, 6) Balance charge with electrons, 7) Multiply half-reactions to equalize electrons, 8) Add half-reactions and simplify. Would you like to see an example?",
      timestamp: "2023-10-16T10:16:00",
      isAI: true
    }
  ]
};

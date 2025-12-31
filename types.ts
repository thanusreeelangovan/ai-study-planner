
export interface Subject {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'Exam' | 'Assignment' | 'General Study';
  deadline: string;
}

export interface StudyPlan {
  summary: string;
  schedule: Array<{
    day: string;
    sessions: Array<{
      time: string;
      subject: string;
      focus: string;
    }>;
  }>;
  priorities: Array<{
    subject: string;
    reason: string;
    strategy: string;
  }>;
  tips: string[];
}

export interface UserInput {
  subjects: Subject[];
  dailyHours: number;
  startDate: string;
  endDate: string;
}

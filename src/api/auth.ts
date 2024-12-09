// src/api/auth.ts
import axios from './axios';

export const signup = (userData: {
  address: string;
  contact: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
}) => {
  return axios.put('/student/signup', userData);
};

export const signinTeacher = (credentials: {
  username: string;
  password: string;
}) => {
  return axios.post('/teacher/login', credentials);
};

// export const updateadmin = (
//   adminId: string,
//   adminData: { username: string; password: string; },
// ) => {
//   return axios.put(`/admin/update/${adminId}`, adminData);
// };
export const teachersignup = (userData: {
  cnic: string;
  contact: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
}) => {
  return axios.put('/teacher/signup', userData);
};

export const getAllStudents = () => {
  return axios.get('/student/getAll');
};

export const getAllTeachers = () => {
  return axios.get('/teacher/teachers');
};

export const update = (
  studentId: string,
  studentData: {
    firstName: string;
    lastName: string;
    contact: string;
    address: string;
  },
) => {
  return axios.put(`/student/update/${studentId}`, studentData);
};

export const updateteacher = (
  teacherId: string,
  teacherData: { firstName: string; lastName: string; contact: string },
) => {
  return axios.put(`/teacher/update/${teacherId}`, teacherData);
};

export const deleteStudent = (studentId: string) => {
  return axios.delete(`/student/${studentId}`);
};

export const deleteTeacher = (teacherId: string) => {
  return axios.delete(`/teacher/${teacherId}`);
};

export const findstuent = (username: string) => {
  return axios.get(`student/getByUsername/${username}`);
};

export const assignTeacher = (assignmentData: {
  teacherId: string;
  studentId: string;
}) => {
  return axios.post('/admin/assignTeacher', assignmentData);
};

export const getStudentById = (studentId: string) => {
  return axios.get(`/student/getById/${studentId}`);
};

export const getTeacherById = (teacherId: string) => {
  return axios.get(`/teacher/getById/${teacherId}`);
};

export const getAssignedStudents = (teacherId: string) => {
  return axios.post('/teacher/getAssignedStudents', { teacherId });
};
export const getAssignedTeachers = (studentId: string) => {
  return axios.post('/teacher/getAssignedTeachers', { studentId });
};
// 
export const assignCourse = (courseData: {
  courseId:number;
  teacherId: string;
  studentId: string;
}) => {
  return axios.put('/course/assignCourse', courseData);
};

export const getAllCourses = () => {
  return axios.get('/course/getCourses');
};

export const deleteCourse = (courseId: string) => {
  return axios.delete(`/course/${courseId}`);
};

export const updateCourse = async (
  courseId: string,
  courseData: {
    courseName: string;
    duration: string;
    studentId?: string;
    teacherId?: string;
    description: string;
  },
) => {
  try {
    const response = await axios.put(`/course/${courseId}`, courseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCourseByStdId = (stdId: any) => {
  return axios.get(`/course/getCourseByStdId/${stdId}`);
};

export const getCourseByStdAndTeacherId = (stdId: any,teacherId: any) => {
  return axios.get(`/course/getCourseByStdAndTeacherId/${stdId}/${teacherId}`);
};
export const getCourseByStdAndCourseId = (studentIds: any[], courseId: any) => {
  return axios.post('/course/getCourseByStdAndCourseId', { studentIds, courseId });
};

export const getCourseByTeacherId = (teacherId: string) => {
  return axios.get(`/course/getCourseByTeacherId/${teacherId}`);
};

export const uploadResource = (formData: FormData) => {
  return axios.post('/resource/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getResourcesByStudentAndCourse = (
  studentId: string,
  courseId: string,
) => {
  return axios.get(`/resource/student/${studentId}/course/${courseId}`);
};

export const getResourcesByStudent = (
  studentId: string,
) => {
  return axios.get(`/resource/student/${studentId}`);
};

export const deleteResource = (resourceId: string) => {
  return axios.delete(`/resource/${resourceId}`);
};

export const addQualification = (qualificationData: {
  degree: string;
  institution: string;
  teacherId: string;
  year: string;
}) => {
  return axios.post('/teacher/qualifications', qualificationData);
};

export const getQualification = (qualificationId: string) => {
  return axios.get(`/teacher/qualifications/${qualificationId}`);
};

export const updateQualification = (
  qualificationId: string,
  qualificationData: {
    degree: string;
    institution: string;
    teacherId: string;
    year: string;
  },
) => {
  return axios.put(
    `/teacher/qualifications/${qualificationId}`,
    qualificationData,
  );
};

export const deleteQualification = (qualificationId: string) => {
  return axios.delete(`/teacher/qualifications/${qualificationId}`);
};

export const addSpecialization = (specializationData: {
  name: string;
  description: string;
  teacherId: string;
}) => {
  return axios.post('/teacher/specializations', specializationData);
};

export const getSpecializations = (teacherId: string) => {
  return axios.get(`/teacher/specializations/${teacherId}`);
};


export const updateSpecializations = (
  specializationId: string,
  SpecializationsData: {
    name: string;
    description: string;
    teacherId: string;
  },
) => {
  return axios.put(
    `/teacher/specializations/${specializationId}`,
    SpecializationsData,
  );
};

export const deletespecializations = (specializationId: string) => {
  return axios.delete(`/teacher/specializations/${specializationId}`);
};

export const uploadProfileImage = (formData: FormData) => {
  return axios.post('/teacher/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};



export const getProfileImage = (teacherId: string) => {

  return axios.get(`/teacher/profileImage/${teacherId}`);
};


export const getCounts = (teacherId: string) => {
  return axios.get(`/teacher/getCountsForProfile/${teacherId}`);
};




export const addFeedback = (feedbackData: {
  studentId: string;
  teacherId: string;
  feedback: string;
  rating: number;
}) => {
  return axios.post('/teacher/feedback', feedbackData);
};


export const getFeedback = (teacherId: string) => {
  return axios.get(`/teacher/feedback/${teacherId}`);
};


// -----------------Classes----------------


export const addUpcomingClass = (classData: {
  studentId: string;
  date: string;
  time: string;
  teacherId: string;
  courseDetailsId: string;
  meetingLink: string;
}) => {
  return axios.post('/teacher/upcoming-classes', classData);
};


export const getUpcomingClasses = (teacherId: any) => {
  return axios.get(`/teacher/upcoming-classes/${teacherId}`);
};
export const getAllUpcomingClasses = () => {
  return axios.get(`/teacher/all-upcoming-classes`);
};

export const deleteUpcomingClass = (meetingId: string) => {
  return axios.delete(`/teacher/upcoming-classes/${meetingId}`);


};

export const getStudentUpcomingClasses = (studentId: string) => {
  return axios.get(`/student/upcoming-classes/${studentId}`);
};

export const getClassMetrics = (teacherId: string) => {
  return axios.get(`/teacher/class-metrics/${teacherId}`);
};



// ----------------------quiz---------------

export const createQuiz = (quizData: {
  title: string;
  instructions: string;
  duration: number;
  passingScore: number;
  teacherId: string;
}) => {
  return axios.post('/quiz/quizzes', quizData);
};


export const getQuizWithQuestion = (quizId: string) => {
  return axios.get(`/quiz/quizzes/${quizId}`);
};


export const getQuizzesByTeacher = (teacherId: string) => {
  return axios.get(`quiz/quizzesByTeacher/${teacherId}`);
};


export const addQuestionToQuiz = (
  quizId: string, 
  questionData: {
    type: 'multiple_choice' | 'true_false' | 'short_answer';
    question: string;
    options?: string[];
    correctAnswer?: boolean | string;
  }
) => {
  return axios.post(`quiz/quizzes/${quizId}/questions`, questionData);
};


//quiz delete
export const deleteQuiz = (quizId: string) => {
  return axios.delete(`/quiz/quizzes/${quizId}`);
};



export const deleteQuestion = (questionId: string) => {
  return axios.delete(`/quiz/quizzes/questions/${questionId}`);
};



export const assignCourseAndStudentToQuiz = (data: {
  quizId: string;
  courseDetailsId: string;
  studentId: string;
}) => {
  return axios.put('/quiz/assign', data);
};


export const getStudentQuizzes = (studentId: string) => {
  return axios.get(`/quiz/student/${studentId}/quizzes`);
};



export const startQuizAttempt = (data: {
  quizId: string;
  studentId: string;
}) => {
  return axios.post('/quiz/quiz-attempts', data);
};


export const submitQuizAttempt = (attemptId: string, data: {
  answers: any[];
  endTime: any;
}) => {
  return axios.put(`/quiz/quiz-attempts/${attemptId}`, data);
};



export const checkIfStudentHasAttemptedQuiz = (studentId: string, quizId: string) => {
  return axios.get(`/quiz/student/${studentId}/quiz-attempts/${quizId}`);
};



// _________________Assignments________________





export const createAssignment = (formData: FormData) => {
  return axios.post('/assignment/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    
  });
};

export const submitAssignment = (submittedAssignmentId: string, file: File) => {
  const formData = new FormData();
  formData.append('submittedAssignmentId', submittedAssignmentId);
  formData.append('file', file);

  return axios.post('/assignment/submit', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const gradeAssignment = (data: {
  submittedAssignmentId: string;
  score: number;
  feedback: string;
}) => {
  return axios.post('/assignment/grade', data);
};


export const getStudentAssignments = (studentId: string) => {
  return axios.get(`/assignment/student/${studentId}`);
};




export const getAllAssignmentsTeacher = (teacherId: string) => {
  return axios.get(`/assignment/allAssignments/${teacherId}`);
};

  export const getTeacherAssignments = (teacherId: string) => {
    return axios.get(`/assignment/teacher/${teacherId}`);
  };


export const deleteAssignmentFile = (assignmentId: string) => {
  return axios.delete(`/assignment/${assignmentId}`);
};


export const deleteSubmittedAssignmentFile = (submittedAssignmentId: string) => {
  return axios.delete(`/assignment/submittedAssignment/${submittedAssignmentId}`);
};

// --------------- Student Dashboard----------------------


export const getStudentDashboardData = (studentId: string) => {
  return axios.get(`/student/dashboard/${studentId}`);
};


export const getAssessmentScore = (studentId: string) => {
  return axios.get(`/student/dashboard/assess/${studentId}`);
};

export const getLeaderboard = (studentId: string) => {
  return axios.get(`/student/dashboard/leaderboard/${studentId}`);
};

// ---------------Attendance ------------
export const markAttendance = (attendanceData: {
  studentId: number;
  courseDetailsId: number;
  date: string;
  status: 'Present' | 'Absent';
}) => {
  return axios.post('/attendance/mark', attendanceData);
};

export const getStudentAttendance = (studentId: string) => {
  return axios.get(`/attendance/student/${studentId}`);
};


// admin feedback
export const giveFeedbackAdmin = (feedbackData: {
  studentId: any;
  feedback: any;
  areasToImprove?:any;
  progressInGrades?:any;
  courseDetailsId:any;
}) => {
  return axios.post('/adminFeedback/add', feedbackData);
};

export const getAdminFeedback = (studentId: string) => {
  return axios.get(`/adminFeedback/student/${studentId}`);
};

export const getAllFeedback = () => {
  return axios.get(`/adminFeedback/getAllFeedbacks`);
};

export const deleteFeedback = (feedbackId:number) => {
  return axios.delete(`/adminFeedback/${feedbackId}`);
};
//bookmark 
export const toggleBookmark = (bookmarkData: {
  studentId: string;
  courseId: string;
  resourceId:string;
  url: string;
}) => {
  return axios.post('/bookmark/add', bookmarkData);
};

export const isBookmark = (
  studentId: string,
  resourceId: string,
) => {
  return axios.get(`/bookmark/isBookmarked/${studentId}/${resourceId}`);
};

export const getBookmark = (
  studentId: string
) => {
  return axios.get(`/bookmark/student/${studentId}`);
};

//make up class
export const addMakeupClass = (classData: {
  studentId: string;
  date: string;
  time: string;
  teacherId: string;
  courseDetailsId: string;
  reason: string;
  status?:string;
}) => {
  return axios.post('/makeupclass/schedule', classData);
};

export const getStdMakeUpClasses = (
  studentId: string
) => {
  return axios.get(`/makeupclass/getStatus/${studentId}`);
};

export const cancelMakeup = (classId:number) => {
  return axios.delete(`/makeupclass/${classId}`);
};

//admin updateStatus
export const getAllMakeUpClassesReq = (
) => {
  return axios.get(`/makeupclass/getAllStatus`);
};

export const updateMakeupClassStatus = (classData: {
  status: string;
  adminReason?: string;
},classId: number) => {
  return axios.put(`/makeupclass/updateStatus/${classId}`, classData);
};

export const getAllCoursesCrud = () => {
  return axios.get('/admin/getAllCourses');
};
export const addCourseCrud = (formData:FormData) => {
  return axios.post('/admin/addCourse', formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const getAllCoursesUpcoming = () => {
  return axios.get('/admin/getAllCoursesUpcoming');
};

export const updateCourseCrud = async (
  courseId: string,
  formData: FormData
) => {
  try {
    const response = await axios.put(`/admin/updateCourse/${courseId}`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCourseCrud = (courseId: string) => {
  return axios.delete(`/admin/deleteCourse/${courseId}`);
};

export const getCourses = () => {
  return axios.get('/admin/getAllCourses');
};

export const addCourseUpcoming = (courseData: {
  teacherId?: string;
  studentId?: string;
  courseId: string;
  startingFrom?:any;
  isStarted:boolean;
}) => {
  return axios.post('/upcomingCourses/', courseData);
};

export const getAllUpcomingCoursesTable = () => {
  return axios.get('/upcomingCourses');
};

export const updateCourseUpcoming = async (
  id: string,
  courseData: {
    teacherId: string;
    studentId?: string;
    courseId?: string;
    startingFrom:string;
  },
) => {
  try {
    const response = await axios.put(`/upcomingCourses/${id}`, courseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCourseUpcoming= (id: string) => {
  return axios.delete(`/upcomingCourses/${id}`);
};

export const enrollStudentsInUpcomingCourse = (courseData: {
  studentId?: string;
  courseId: string;
}) => {
  return axios.post('/upcomingCourses/enroll', courseData);
};

export const getStudentEnrolledCourses = (studentId:any) => {
  return axios.get(`/upcomingCourses/enrolledCourses/${studentId}`);
};
export const getEnrolledCoursesWithCourseId = (courseId:any) => {
  return axios.get(`/upcomingCourses/enrolledCoursesWithCourseId/${courseId}`);
};

export const shareProgressToSocial = (data:FormData) => {
  return axios.post('/resource/uploadProgress', data,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

//inventory system API's

export const getRoles = () => {
  return axios.get('/admin/getRoles');
};
export const getUsers = () => {
  return axios.get('/admin/getUsers');
};

export const addUser = (formData: any) => {
  return axios.post('/admin/addUser', formData);
};

export const updateUser = (formData: any,id:any) => {
  return axios.put(`/admin/updateUser/${id}`, formData);
};

export const deleteUser = (id:any) => {
  return axios.delete(`/admin/deleteUser/${id}`);
};


//user sign in

export const signinadmin = (credentials: {
  username: string;
  password: string;
}) => {
  return axios.post('/auth/login', credentials);
};


export const signin = (credentials: {
  username: string;
  password: string;
}) => {
  return axios.post('/auth/signin', credentials);
};

//supplier and vendor API's
export const createParty = (partyData:any) => {
  return axios.post('/parties/parties', partyData);
};

export const getAllUsers = () => {
  return axios.get('/parties/allUsers');
};

export const updateParty = (partyData:any,id:any) => {
  return axios.put(`/parties/${id}`, partyData);
};

export const deleteParty = (id:any) => {
  return axios.delete(`/parties/${id}`);
};

export const getLatestPartyNo = (isSupplier:boolean) => {
  return axios.get(`/parties/next-number/${isSupplier}`);
};

//stock management
export const getLastItem = () => {
  return axios.get('/items/last-item');
};

export const addItem = (itemData:any) => {
  return axios.post('/items', itemData);
};
export const getAllItems = (page:number,limit:number=10,search="") => {
  return axios.get(`/items/${page}/${limit}/${search}`);
};

export const updateItem = (updateData:any,id:any) => {
  return axios.put(`/items/${id}`, updateData);
};

export const deleteItem = (id:any) => {
  return axios.delete(`/items/${id}`);
};

//quotations
export const getLastInvoiceNo = () => {
  return axios.get('/quotation/last-item');
};

export const createQuotation = (quotationData:any) => {
  return axios.post('/quotation', quotationData);
};

export const getAllQItems = (page:number,limit:number=10,search="") => {
  return axios.get(`/quotation/${page}/${limit}/${search}`);
};

export const updateQuotation = (updateData:any,id:any) => {
  debugger;
  return axios.put(`/quotation/${id}`, updateData);
};

//sales invoice
export const getLastSINo = () => {
  return axios.get('/salesinvoice/last-item');
};

export const createSalesInvoice = (quotationData:any) => {
  return axios.post('/salesinvoice', quotationData);
};

export const getAllSalesInvoiceItems = (page:number,limit:number=10,search="") => {
  return axios.get(`/salesinvoice/${page}/${limit}/${search}`);
};

export const updateSalesInvoice = (updateData:any,id:any) => {
  return axios.put(`/salesinvoice/${id}`, updateData);
};

//purchasing routes
export const getLastPINo = () => {
  return axios.get('/purchaseinvoice/last-item');
};

export const createPurchaseInvoice = (quotationData:any) => {
  return axios.post('/purchaseinvoice', quotationData);
};

export const getAllPurchaseInvoiceItems = (page:number,limit:number=10,search="") => {
  return axios.get(`/purchaseinvoice/${page}/${limit}/${search}`);
};

export const updatePurchaseInvoice = (updateData:any,id:any) => {
  debugger;
  return axios.put(`/purchaseinvoice/${id}`, updateData);
};

//purchase Return routes
export const getLastPRNo = () => {
  return axios.get('/purchasereturn/last-item');
};

export const createPurchaseReturn = (quotationData:any) => {
  return axios.post('/purchasereturn', quotationData);
};

export const getAllPurchaseReturnItems = (page:number,limit:number=10,search="") => {
  return axios.get(`/purchasereturn/${page}/${limit}/${search}`);
};

export const updatePurchaseReturn = (updateData:any,id:any) => {
  debugger;
  return axios.put(`/purchasereturn/${id}`, updateData);
};


//payment receipts
export const createReceiptVoucher = (body:any) => {
  return axios.post('/paymentreceipt', body);
};

export const getPaymentReceiptWithAccount = (page:number=0,limit:number=10,search="") => {
  return axios.get(`/purchaseinvoice/${page}/${limit}/${search}`);
};

//payment vouchers
export const createPaymentVoucher = (body:any) => {
  return axios.post('/paymentvoucher', body);
};



//sales return
export const getLastSRNo = () => {
  return axios.get('/salesreturn/last-item');
};

export const createSalesReturn = (quotationData:any) => {
  return axios.post('/salesreturn', quotationData);
};

export const getAllSalesReturnItems = (page:number,limit:number=10,search="") => {
  return axios.get(`/salesreturn/${page}/${limit}/${search}`);
};

export const updateSalesReturn = (updateData:any,id:any) => {
  return axios.put(`/salesreturn/${id}`, updateData);
};
/**
 * The dataStore below will be used in the given console.log debug statements
 * at the bottom of the file.
 * You can modify this if you want to do your own testing.
 *
 * We will be using a modified dataStore in the automarking - see the
 * "Testing" section the specification.
 */
const dataStore = {
  academics: [
    {
      id: 10,
      name: 'Ada',
      hobby: 'music',
    },
    {
      id: 20,
      name: 'Ben',
      hobby: 'gym',
    },
    {
      id: 30,
      name: 'Cid',
      hobby: 'chess',
    },
    {
      id: 40,
      name: 'Dan',
      hobby: 'art',
    },
    {
      id: 50,
      name: 'Eve',
      hobby: 'yoga',
    },
  ],

  courses: [
    {
      id: 1511,
      name: 'COMP1511',
      description: 'Programming Fundamentals',
      staffIds: [10, 20],
      memberIds: [10, 20, 30, 40, 50],
    },
    {
      id: 1521,
      name: 'COMP1521',
      description: 'Computer Systems Fundamentals',
      staffIds: [20],
      memberIds: [20, 40, 50],
    },
    {
      id: 1531,
      name: 'COMP1531',
      description: 'Software Engineering Fundamentals',
      staffIds: [20, 30],
      memberIds: [20, 30, 10, 40],
    },
  ],
};

/**
 * @returns {{numAcademics: number}} object
 */
function getNumAcademics() {
  let count = 0;
  for (const key in dataStore.academics) {
    count++; 
  }
  return {
    numAcademics: count,
  };
}

/**
 * @returns {{numCourses: number}}
 */
function getNumCourses() {
  let count = 0;
  for (const key in dataStore.courses) {
    count++; 
  }
  return {
    numCourses: count,
  };
}

/**
 * @param {number} academicId - unique identifier for an academic.
 * @returns {{academic: {name: string, hobby: string}}}
 * @returns {{error: string}} on error
 */
function getAcademicDetailsFromId(academicId) {
  for (const key in dataStore.academics) {
    if (academicId === dataStore.academics[key].id) {
      return {
        academic: {
          name: dataStore.academics[key].name,
          hobby: dataStore.academics[key].hobby,
        },
      };
    }
  }
  return {
    error: 'academicID not found',
  };
}

/**
 * @param {number} courseId - unique identifier for a course.
 * @returns {{course: {name: string, description: string}}}
 * @returns {{error: string}} on error
 */
function getCourseDetailsFromId(courseId) {
  for (const key in dataStore.courses) {
    if (courseId === dataStore.courses[key].id) {
      return {
        course: {
          name: dataStore.courses[key].name,
          description: dataStore.courses[key].description,
        },
      };
    }
  }
  return {
    error: 'courseId not found',
  };
}

/**
 * @param {number} academicId - unique indentifier for an academic
 * @param {number} courseId - unique identifier for a course
 * @returns {{isMember: boolean}}
 * @returns {{error: string}} on error
 */
function checkAcademicIsMember(academicId, courseId) {
  // error checking - checks if academicId is valid
  let validId = false;
  for (const key in dataStore.academics) {
    if (dataStore.academics[key].id === academicId) {
      validId = true;
    }
  }
  if (validId === false) {
    return {
      error: 'academicId not found',
    };
  }
  // error checking - checks if courseId is valid
  validId = false;
  for (const key in dataStore.courses) {
    if (dataStore.courses[key].id === courseId) {
      validId = true;
    }
  }
  if (validId === false) {
    return {
      error: 'courseId not found',
    };
  }

  for (const key in dataStore.courses) {
    if ((dataStore.courses[key].id === courseId) &&
        (dataStore.courses[key].memberIds.includes(academicId))) {
      return {
        isMember: true,
      };
    }
  }
  return {
    isMember: false,
  };
}

/**
 * @param {number} academicId - unique indentifier for an academic
 * @param {number} courseId - unique identifier for a course
 * @returns {{isStaff: Boolean}}
 * @returns {{error: string}} on error
 */
function checkAcademicIsStaff(academicId, courseId) {
  // error checking - checks if academicId is valid
  let validId = false;
  for (const key in dataStore.academics) {
    if (dataStore.academics[key].id === academicId) {
      validId = true;
    }
  }
  if (validId === false) {
    return {
      error: 'academicId not found',
    };
  }
  // error checking - checks if courseId is valid
  validId = false;
  for (const key in dataStore.courses) {
    if (dataStore.courses[key].id === courseId) {
      validId = true;
    }
  }
  if (validId === false) {
    return {
      error: 'courseId not found',
    };
  }

  for (const key in dataStore.courses) {
    if ((dataStore.courses[key].id === courseId) &&
        (dataStore.courses[key].staffIds.includes(academicId))) {
      return {
        isStaff: true,
      };
    }
  }
  return {
    isStaff: false,
  };
}

/**
 * You will not be able to compare two objects with `===`. For this week, you
 * can simply console.log() the output and view it manually.
 *
 * NOTE: the output of any console.log statements, e.g. colours/whitespaces
 * does not matter when we mark your code, as we will be assessing the
 * return value of your functions directly.
 */
console.log('1. numAcademics()');
console.log('Expect: { numAcademics: 5 }');
console.log('Output:', getNumAcademics());
console.log();

console.log('2. numCourses()');
console.log('Expect: { numCourses: 3 }');
console.log('Output:', getNumCourses());
console.log();

console.log('3. getAcademicDetailsFromId(10)');
console.log("Expect: { academic: { name: 'Ada', hobby: 'music' } }");
console.log('Output:', getAcademicDetailsFromId(10));
console.log();

console.log('4. getAcademicDetailsFromId(999999)');
console.log("Expect: { error: 'any string value' }");
console.log('Output:', getAcademicDetailsFromId(999999));
console.log();

console.log('5. getCourseDetailsFromId(1511)');
console.log('Output:', getCourseDetailsFromId(1511));
console.log();

console.log('6. checkAcademicIsMember(10, 1511)');
console.log('Output:', checkAcademicIsMember(10, 1511));
console.log();

console.log('6. checkAcademicIsMember(10, 1521)');
console.log('Output:', checkAcademicIsMember(10, 1521));
console.log();

console.log('7. checkAcademicIsStaff(10, 1511)');
console.log('Output:', checkAcademicIsStaff(10, 1511));
console.log();

console.log('7. checkAcademicIsStaff(10, 1521)');
console.log('Output:', checkAcademicIsStaff(10, 1521));
console.log();

console.log('// TODO: You can add more debugging console.log here.');

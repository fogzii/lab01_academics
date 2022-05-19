const rewire = require('rewire');
const process = require('process');

const a = rewire(process.cwd() + '/academics');

const dataStore = a.__get__('dataStore');
const getNumAcademics = a.__get__('getNumAcademics');
const getNumCourses = a.__get__('getNumCourses');
const getAcademicDetailsFromId = a.__get__('getAcademicDetailsFromId');
const getCourseDetailsFromId = a.__get__('getCourseDetailsFromId');
const checkAcademicIsMember = a.__get__('checkAcademicIsMember');
const checkAcademicIsStaff = a.__get__('checkAcademicIsStaff');

// ========================================================================== //
// dataStore

const ERROR = { error: expect.any(String) };

const allAcademics = [
  { id: 999, name: 'Tam', hobby: 'novels' },
  { id: 888, name: 'Hayden', hobby: 'spy' },
  { id: 777, name: 'Giuliana', hobby: 'marking blogs' },
  { id: 666, name: 'Rani', hobby: 'artificial intelligence' },
  { id: 555, name: 'Jake', hobby: 'human research' },
];
const [academicTam, academicHayden, academicGiuliana, academicRani, academicJake] = allAcademics;

const allCourses = [
  {
    id: 2041,
    name: 'COMP2041',
    description: 'Software Construction',
    staffIds: [academicHayden.id, academicJake.id],
    memberIds: [academicHayden.id, academicJake.id, academicTam.id, academicGiuliana.id, academicRani.id],
  },
  {
    id: 2511,
    name: 'COMP2511',
    description: 'Object-Oriented Design & Programming',
    staffIds: [academicHayden.id],
    memberIds: [academicHayden.id, academicTam.id, academicGiuliana.id, academicRani.id],
  },
  {
    id: 6080,
    name: 'COMP6080',
    description: 'Web Front-End Programming',
    staffIds: [academicGiuliana.id],
    memberIds: [academicGiuliana.id, academicTam.id, academicRani.id],
  },
];
const [course2041, course2511, course6080] = allCourses;

const genericTestdataStores = [
  {
    testName: 'Empty case',
    courses: [],
    academics: [],
    expectedNumAcademics: { numAcademics: 0 },
    expectedNumCourses: { numCourses: 0 },
    inputAcademicDetails: academicRani.id,
    expectedAcademicDetails: ERROR,
    inputCourseDetails: course2041.id,
    expectedCourseDetails: ERROR,
    inputIsMemberArray: [academicTam.id, course2041.id],
    expectedIsMember: ERROR,
    inputIsStaffArray: [academicTam.id, course2041.id],
    expectedIsStaff: ERROR,
  },
  {
    testName: 'One academic, one course',
    academics: [academicTam],
    courses: [course2041],
    expectedNumAcademics: { numAcademics: 1 },
    expectedNumCourses: { numCourses: 1 },
    inputAcademicDetails: academicTam.id,
    expectedAcademicDetails: { academic: { name: academicTam.name, hobby: academicTam.hobby } },
    inputCourseDetails: course2041.id,
    expectedCourseDetails: { course: { name: course2041.name, description: course2041.description } },
    inputIsMemberArray: [academicTam.id, course2041.id],
    expectedIsMember: { isMember: true },
    inputIsStaffArray: [academicTam.id, course2041.id],
    expectedIsStaff: { isStaff: false },
  },
  {
    testName: 'Two academics, two courses',
    academics: [academicTam, academicHayden],
    courses: [course2041, course2511],
    expectedNumAcademics: { numAcademics: 2 },
    expectedNumCourses: { numCourses: 2 },
    inputAcademicDetails: academicHayden.id,
    expectedAcademicDetails: { academic: { name: academicHayden.name, hobby: academicHayden.hobby } },
    inputCourseDetails: course2511.id,
    expectedCourseDetails: { course: { name: course2511.name, description: course2511.description } },
    inputIsMemberArray: [academicHayden.id, course2041.id],
    expectedIsMember: { isMember: true },
    inputIsStaffArray: [academicHayden.id, course2041.id],
    expectedIsStaff: { isStaff: true },
  },
  {
    testName: `${allAcademics.length} academics, ${allAcademics.length} courses`,
    academics: allAcademics,
    courses: allCourses,
    expectedNumAcademics: { numAcademics: allAcademics.length },
    expectedNumCourses: { numCourses: allCourses.length },
    inputAcademicDetails: academicGiuliana.id,
    expectedAcademicDetails: { academic: { name: academicGiuliana.name, hobby: academicGiuliana.hobby } },
    inputCourseDetails: course6080.id,
    expectedCourseDetails: { course: { name: course6080.name, description: course6080.description } },
    inputIsMemberArray: [academicGiuliana.id, course2511.id],
    expectedIsMember: { isMember: true },
    inputIsStaffArray: [academicGiuliana.id, course6080.id],
    expectedIsStaff: { isStaff: true },
  }
];

// See API: https://jestjs.io/docs/api

//= ========================================================================= //
// Generic Tests
//= ========================================================================= //

/**
 *
 * Basic helper to replace dataStore and compare function input/output
 *
 * @param d dataStore
 * @param func to test
 * @param input for function
 * @param expected expected object output
 */
const compare = (d, func, inputs, expected) => {
  dataStore.academics = d.academics;
  dataStore.courses = d.courses;
  expect(func(...inputs)).toEqual(expected);
};

describe('getNumAcademics', () => {
  test.each(genericTestdataStores)('$testName', d => {
    compare(d, getNumAcademics, [], d.expectedNumAcademics);
  });
});

describe('getNumCourses', () => {
  test.each(genericTestdataStores)('$testName', d => {
    compare(d, getNumCourses, [], d.expectedNumCourses);
  });
});

describe('getAcademicDetailsFromId', () => {
  test.each(genericTestdataStores)('$testName | id: $inputAcademicDetails', d => {
    compare(d, getAcademicDetailsFromId, [d.inputAcademicDetails], d.expectedAcademicDetails);
  });
});

describe('getCourseDetailsFromId', () => {
  test.each(genericTestdataStores)('$testName | id: $inputCourseDetails', d => {
    compare(d, getCourseDetailsFromId, [d.inputCourseDetails], d.expectedCourseDetails);
  });
});

describe('checkAcademicIsMember', () => {
  test.each(genericTestdataStores)('$testName | [academicId, courseId]: $inputIsMemberArray', d => {
    compare(d, checkAcademicIsMember, d.inputIsMemberArray, d.expectedIsMember);
  });
});

describe('checkAcademicIsStaff', () => {
  test.each(genericTestdataStores)('$testName | [academicId, courseId]: $inputIsStaffArray', d => {
    compare(d, checkAcademicIsStaff, d.inputIsStaffArray, d.expectedIsStaff);
  });
});

//= ========================================================================= //
// Additional Tests / Style Demo
//= ========================================================================= //

describe('Full data error cases', () => {
  dataStore.academics = allAcademics;
  dataStore.courses = allCourses;

  const invalidAcademicId = 999999;
  const invalidCourseId = 999999;
  test('getAcademicDetails', () => {
    expect(getAcademicDetailsFromId(invalidAcademicId)).toEqual(ERROR);
  });
  test('getCourseDetails', () => {
    expect(getCourseDetailsFromId(invalidCourseId)).toEqual(ERROR);
  });
  test('checkAcademicIsMember', () => {
    expect(checkAcademicIsMember(academicTam.id, invalidCourseId)).toEqual(ERROR);
    expect(checkAcademicIsMember(invalidAcademicId, course2041.id)).toEqual(ERROR);
    expect(checkAcademicIsMember(invalidAcademicId, invalidCourseId)).toEqual(ERROR);
  });
  test('checkAcademicIsStaff', () => {
    expect(checkAcademicIsStaff(academicTam.id, invalidCourseId)).toEqual(ERROR);
    expect(checkAcademicIsStaff(invalidAcademicId, course2041.id)).toEqual(ERROR);
    expect(checkAcademicIsStaff(invalidAcademicId, invalidCourseId)).toEqual(ERROR);
  });
});

// server/scripts/insertQuestions.js


require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Question = require('../../models/Question');

const questions = [
  {
    problem_id: "L0001",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    shardsReward: 50,
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { input: "[3,3], 6", expectedOutput: "[0,1]" }
    ]
  },
  {
    problem_id: "L0002",
    title: "Add Two Numbers",
    difficulty: "Medium",
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    shardsReward: 75,
    testCases: [
      { input: "[2,4,3], [5,6,4]", expectedOutput: "[7, 0, 8]" }
    ]
  },
  {
    problem_id: "L0003",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string s, find the length of the longest substring without duplicate characters.",
    shardsReward: 75,
    testCases: [
      { input: "\"abcabcbb\"", expectedOutput: "3" },
      { input: "\"bbbbb\"", expectedOutput: "1" }
    ]
  },
  {
    problem_id: "L0004",
  title: "Median of Two Sorted Arrays",
  difficulty: "Hard",
  description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
  shardsReward: 100,
  testCases: [
    { input: "[1,3], [2]", expectedOutput: "2.00000" },
    { input: "[1,2], [3,4]", expectedOutput: "2.50000" }
  ]
},
{
    problem_id: "L0005",
  title: "Longest Palindromic Substring",
  difficulty: "Medium",
  description: "Given a string s, return the longest palindromic substring in s.",
  shardsReward: 75,
  testCases: [
    { input: "\"babad\"", expectedOutput: "\"bab\"" },
    { input: "\"cbbd\"", expectedOutput: "\"bb\"" }
  ]
},
{
    problem_id: "L0006",
  title: "Zigzag Conversion",
  difficulty: "Medium",
  description: "The string \"PAYPALISHIRING\" is written in a zigzag pattern on a given number of rows like this:\n\nP   A   H   N\nA P L S I I G\nY   I   R\n\nAnd then read line by line: \"PAHNAPLSIIGYIR\"\n\nWrite the code that will take a string and make this conversion given a number of rows:\n\nstring convert(string s, int numRows);",
  shardsReward: 75,
  testCases: [
    { input: "\"PAYPALISHIRING\", 3", expectedOutput: "\"PAHNAPLSIIGYIR\"" },
    { input: "\"PAYPALISHIRING\", 4", expectedOutput: "\"PINALSIGYAHRPI\"" },
    { input: "\"A\", 1", expectedOutput: "\"A\"" }
  ]
},

{
    problem_id: "L0007",
  title: "Reverse Integer",
  difficulty: "Medium",
  description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
  shardsReward: 75,
  testCases: [
    { input: "123", expectedOutput: "321" },
    { input: "-123", expectedOutput: "-321" },
    { input: "120", expectedOutput: "21" },
    { input: "1534236469", expectedOutput: "0" }
  ]
},
{
    problem_id: "L0008",
  title: "String to Integer (atoi)",
  difficulty: "Medium",
  description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.\n\nThe algorithm for myAtoi(string s) is as follows:\n\n1. Whitespace: Ignore any leading whitespace (\" \").\n2. Signedness: Determine the sign by checking if the next character is '-' or '+', assuming positivity if neither present.\n3. Conversion: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.\n4. Rounding: If the integer is out of the 32-bit signed integer range [-2^31, 2^31 - 1], then round the integer to remain in the range. Specifically, integers less than -2^31 should be rounded to -2^31, and integers greater than 2^31 - 1 should be rounded to 2^31 - 1.\n\nReturn the integer as the final result.",
  shardsReward: 75,
  testCases: [
    { input: "\"42\"", expectedOutput: "42" },
    { input: "\"   -042\"", expectedOutput: "-42" },
    { input: "\"1337c0d3\"", expectedOutput: "1337" },
    { input: "\"0-1\"", expectedOutput: "0" },
    { input: "\"words and 987\"", expectedOutput: "0" },
    { input: "\"9223372036854775808\"", expectedOutput: "2147483647" },
    { input: "\"-91283472332\"", expectedOutput: "-2147483648" }
  ]
},
{
    problem_id: "L0009",
  title: "Palindrome Number",
  difficulty: "Easy",
  description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
  shardsReward: 50,
  testCases: [
    { input: "121", expectedOutput: "true" },
    { input: "-121", expectedOutput: "false" },
    { input: "10", expectedOutput: "false" },
    { input: "0", expectedOutput: "true" },
    { input: "12321", expectedOutput: "true" }
  ]
},
{
    problem_id: "L0010",
  title: "Regular Expression Matching",
  difficulty: "Hard",
  description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n\n- '.' Matches any single character.\n- '*' Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).\n\nConstraints:\n- 1 <= s.length <= 20\n- 1 <= p.length <= 20\n- s contains only lowercase English letters.\n- p contains only lowercase English letters, '.', and '*'.\n- It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.",
  shardsReward: 100,
  testCases: [
    { input: "\"aa\", \"a\"", expectedOutput: "false" },
    { input: "\"aa\", \"a*\"", expectedOutput: "true" },
    { input: "\"ab\", \".*\"", expectedOutput: "true" },
    { input: "\"mississippi\", \"mis*is*p*.\"", expectedOutput: "false" },
    { input: "\"aab\", \"c*a*b\"", expectedOutput: "true" }
  ]
},
{
    problem_id: "L0011",
  title: "Container With Most Water",
  difficulty: "Medium",
  description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\nNotice that you may not slant the container.",
  shardsReward: 75,
  testCases: [
    { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" },
    { input: "[1,1]", expectedOutput: "1" },
    { input: "[4,3,2,1,4]", expectedOutput: "16" },
    { input: "[1,2,1]", expectedOutput: "2" }
  ]
},
{
    problem_id: "L0012",
  title: "Integer to Roman",
  difficulty: "Medium",
  description: "Seven different symbols represent Roman numerals with the following values:\n\nSymbol\tValue\nI\t1\nV\t5\nX\t10\nL\t50\nC\t100\nD\t500\nM\t1000\n\nRoman numerals are formed by appending the conversions of decimal place values from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:\n\n- If the value does not start with 4 or 9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.\n- If the value starts with 4 or 9 use the subtractive form representing one symbol subtracted from the following symbol, for example, 4 is 1 (I) less than 5 (V): IV and 9 is 1 (I) less than 10 (X): IX. Only the following subtractive forms are used: 4 (IV), 9 (IX), 40 (XL), 90 (XC), 400 (CD) and 900 (CM).\n- Only powers of 10 (I, X, C, M) can be appended consecutively at most 3 times to represent multiples of 10. You cannot append 5 (V), 50 (L), or 500 (D) multiple times. If you need to append a symbol 4 times use the subtractive form.\n\nGiven an integer, convert it to a Roman numeral.",
  shardsReward: 75,
  testCases: [
    { input: "3749", expectedOutput: "\"MMMDCCXLIX\"" },
    { input: "58", expectedOutput: "\"LVIII\"" },
    { input: "1994", expectedOutput: "\"MCMXCIV\"" },
    { input: "4", expectedOutput: "\"IV\"" },
    { input: "9", expectedOutput: "\"IX\"" }
  ]
},
{
    problem_id: "L0013",
  title: "Roman to Integer",
  difficulty: "Easy",
  description: "Roman numerals are represented by seven different symbols:\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nFor example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:\n\n- I can be placed before V (5) and X (10) to make 4 and 9.\n- X can be placed before L (50) and C (100) to make 40 and 90.\n- C can be placed before D (500) and M (1000) to make 400 and 900.\n\nGiven a roman numeral, convert it to an integer.",
  shardsReward: 50,
  testCases: [
    { input: "\"III\"", expectedOutput: "3" },
    { input: "\"LVIII\"", expectedOutput: "58" },
    { input: "\"MCMXCIV\"", expectedOutput: "1994" },
    { input: "\"IV\"", expectedOutput: "4" },
    { input: "\"XL\"", expectedOutput: "40" }
  ]
},
{
    problem_id: "L0014",
  title: "Longest Common Prefix",
  difficulty: "Easy",
  description: "Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string \"\".",
  shardsReward: 50,
  testCases: [
    { input: "[\"flower\",\"flow\",\"flight\"]", expectedOutput: "\"fl\"" },
    { input: "[\"dog\",\"racecar\",\"car\"]", expectedOutput: "\"\"" },
    { input: "[\"interspace\",\"internet\",\"interval\"]", expectedOutput: "\"inte\"" },
    { input: "[\"a\"]", expectedOutput: "\"a\"" },
    { input: "[\"abc\",\"abc\",\"abc\"]", expectedOutput: "\"abc\"" }
  ]
},
{
    problem_id: "L0015",
  title: "3Sum",
  difficulty: "Medium",
  description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.",
  shardsReward: 75,
  testCases: [
    { input: "[-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]" },
    { input: "[0,1,1]", expectedOutput: "[]" },
    { input: "[0,0,0]", expectedOutput: "[[0,0,0]]" },
    { input: "[-2,0,1,1,2]", expectedOutput: "[[-2,0,2],[-2,1,1]]" },
    { input: "[-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]", expectedOutput: "[[-4,0,4],[-4,1,3],[-4,2,2],[-2,-2,4],[-2,0,2]]" }
  ]
},
{
    problem_id: "L0016",
  title: "3Sum Closest",
  difficulty: "Medium",
  description: "Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.\n\nReturn the sum of the three integers.\n\nYou may assume that each input would have exactly one solution.",
  shardsReward: 75,
  testCases: [
    { input: "[-1,2,1,-4], 1", expectedOutput: "2" },
    { input: "[0,0,0], 1", expectedOutput: "0" },
    { input: "[1,1,1,0], -100", expectedOutput: "2" },
    { input: "[4,0,5,-5,3,3,0,-4,-5]", expectedOutput: "0" },
    { input: "[1,2,5,10,11], 12", expectedOutput: "13" }
  ]
},
{
    problem_id: "L0017",
  title: "Letter Combinations of a Phone Number",
  difficulty: "Medium",
  description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nA mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.",
  shardsReward: 75,
  testCases: [
    {
      input: "\"23\"",
      expectedOutput: "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"
    },
    {
      input: "\"\"",
      expectedOutput: "[]"
    },
    {
      input: "\"2\"",
      expectedOutput: "[\"a\",\"b\",\"c\"]"
    },
    {
      input: "\"9\"",
      expectedOutput: "[\"w\",\"x\",\"y\",\"z\"]"
    },
    {
      input: "\"79\"",
      expectedOutput: "[\"pw\",\"px\",\"py\",\"pz\",\"qw\",\"qx\",\"qy\",\"qz\",\"rw\",\"rx\",\"ry\",\"rz\",\"sw\",\"sx\",\"sy\",\"sz\"]"
    }
  ]
},
{
    problem_id: "L0018",
  title: "4Sum",
  difficulty: "Medium",
  description: "Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:\n\n- 0 <= a, b, c, d < n\n- a, b, c, and d are distinct.\n- nums[a] + nums[b] + nums[c] + nums[d] == target\n\nYou may return the answer in any order.",
  shardsReward: 75,
  testCases: [
    {
      input: "[1,0,-1,0,-2,2], 0",
      expectedOutput: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]"
    },
    {
      input: "[2,2,2,2,2], 8",
      expectedOutput: "[[2,2,2,2]]"
    },
    {
      input: "[0,0,0,0], 0",
      expectedOutput: "[[0,0,0,0]]"
    },
    {
      input: "[1,1,1,1,1], 4",
      expectedOutput: "[[1,1,1,1]]"
    },
    {
      input: "[0,1,2,3,4,5], 10",
      expectedOutput: "[[0,1,4,5],[0,2,3,5],[1,2,3,4]]"
    }
  ]
},
{
    problem_id: "L0019",
  title: "Remove Nth Node From End of List",
  difficulty: "Medium",
  description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
  shardsReward: 75,
  testCases: [
    {
      input: "[1,2,3,4,5], 2",
      expectedOutput: "[1,2,3,5]"
    },
    {
      input: "[1], 1",
      expectedOutput: "[]"
    },
    {
      input: "[1,2], 1",
      expectedOutput: "[1]"
    },
    {
      input: "[1,2,3], 3",
      expectedOutput: "[2,3]"
    },
    {
      input: "[10,20,30,40,50], 5",
      expectedOutput: "[20,30,40,50]"
    }
  ]
},
{
    problem_id: "L0020",
  title: "Valid Parentheses",
  difficulty: "Easy",
  description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n- Open brackets must be closed by the same type of brackets.\n- Open brackets must be closed in the correct order.\n- Every close bracket has a corresponding open bracket of the same type.",
  shardsReward: 50,
  testCases: [
    {
      input: "()",
      expectedOutput: "true"
    },
    {
      input: "()[]{}",
      expectedOutput: "true"
    },
    {
      input: "(]",
      expectedOutput: "false"
    },
    {
      input: "([])",
      expectedOutput: "true"
    },
    {
      input: "([)]",
      expectedOutput: "false"
    }
  ]
},
{
    problem_id: "L0021",
  title: "Merge Two Sorted Lists",
  difficulty: "Easy",
  description: "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
  shardsReward: 50,
  testCases: [
    {
      input: { list1: [1,2,4], list2: [1,3,4] },
      expectedOutput: [1,1,2,3,4,4]
    },
    {
      input: { list1: [], list2: [] },
      expectedOutput: []
    },
    {
      input: { list1: [], list2: [0] },
      expectedOutput: [0]
    }
  ]
},
{ problem_id: "L0022",
  title: "Generate Parentheses",
  difficulty: "Medium",
  description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
  shardsReward: 75,
  testCases: [
    {
      input: { n: 3 },
      expectedOutput: ["((()))","(()())","(())()","()(())","()()()"]
    },
    {
      input: { n: 1 },
      expectedOutput: ["()"]
    }
  ]
},
{
    problem_id: "L0023",
  title: "Merge k Sorted Lists",
  difficulty: "Hard",
  description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
  shardsReward: 100,
  testCases: [
    {
      input: { lists: [[1,4,5],[1,3,4],[2,6]] },
      expectedOutput: [1,1,2,3,4,4,5,6]
    },
    {
      input: { lists: [] },
      expectedOutput: []
    },
    {
      input: { lists: [[]] },
      expectedOutput: []
    }
  ]
},

{
    problem_id: "L0024",
  title: "Swap Nodes in Pairs",
  difficulty: "Medium",
  description: "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)",
  shardsReward: 75,
  testCases: [
    {
      input: { head: [1,2,3,4] },
      expectedOutput: [2,1,4,3]
    },
    {
      input: { head: [] },
      expectedOutput: []
    },
    {
      input: { head: [1] },
      expectedOutput: [1]
    },
    {
      input: { head: [1,2,3] },
      expectedOutput: [2,1,3]
    }
  ]
},
{
    problem_id: "L0025",
  title: "Reverse Nodes in k-Group",
  difficulty: "Hard",
  description: "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.\n\nk is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.\n\nYou may not alter the values in the list's nodes, only nodes themselves may be changed.",
  shardsReward: 100,
  testCases: [
    { input: "[1,2,3,4,5], 2", expectedOutput: "[2,1,4,3,5]" },
    { input: "[1,2,3,4,5], 3", expectedOutput: "[3,2,1,4,5]" },
    { input: "[1], 1", expectedOutput: "[1]" }
  ]
}
,
{
    problem_id: "L0026",
  title: "Remove Duplicates from Sorted Array",
  difficulty: "Easy",
  description: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.\n\nYou must do this in-place and with O(1) extra memory.\n\nThe judge will test your solution with the following code:\n\nint[] nums = [...]; // Input array\nint[] expectedNums = [...]; // The expected answer with correct length\n\nint k = removeDuplicates(nums); // Calls your implementation\n\nassert k == expectedNums.length;\nfor (int i = 0; i < k; i++) {\n    assert nums[i] == expectedNums[i];\n}",
  shardsReward: 50,
  testCases: [
    { input: "[1,1,2]", expectedOutput: "2, [1,2,_]" },
    { input: "[0,0,1,1,1,2,2,3,3,4]", expectedOutput: "5, [0,1,2,3,4,_,_,_,_,_]" },
    { input: "[1,2,3]", expectedOutput: "3, [1,2,3]" }
  ]
}
,
{
    problem_id: "L0027",
  title: "Remove Element",
  difficulty: "Easy",
  description: "Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.\n\nYou must do this with O(1) extra memory.\n\nThe judge will test your solution with the following code:\n\nint[] nums = [...]; // Input array\nint val = ...; // Value to remove\nint[] expectedNums = [...]; // The expected answer with correct length.\n                            // It is sorted with no values equaling val.\n\nint k = removeElement(nums, val); // Calls your implementation\n\nassert k == expectedNums.length;\nsort(nums, 0, k); // Sort the first k elements of nums\nfor (int i = 0; i < actualLength; i++) {\n    assert nums[i] == expectedNums[i];\n}",
  shardsReward: 50,
  testCases: [
    { input: "[3,2,2,3], 3", expectedOutput: "2, [2,2,_,_]" },
    { input: "[0,1,2,2,3,0,4,2], 2", expectedOutput: "5, [0,1,4,0,3,_,_,_]" },
    { input: "[1,1,1], 1", expectedOutput: "0, [_,_,_]" }
  ]
}
,
{
    problem_id: "L0028",
  title: "Find the Index of the First Occurrence in a String",
  difficulty: "Easy",
  description: "Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
  shardsReward: 50,
  testCases: [
    { input: "\"sadbutsad\", \"sad\"", expectedOutput: "0" },
    { input: "\"leetcode\", \"leeto\"", expectedOutput: "-1" },
    { input: "\"hello\", \"ll\"", expectedOutput: "2" }
  ]
}
,
{
    problem_id: "L0029",
  title: "Divide Two Integers",
  difficulty: "Medium",
  description: "Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.\n\nThe integer division should truncate toward zero, which means losing its fractional part. For example, 8.345 would be truncated to 8, and -2.7335 would be truncated to -2.\n\nReturn the quotient after dividing dividend by divisor.\n\nNote: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−2^31, 2^31 − 1]. For this problem, if the quotient is strictly greater than 2^31 − 1, then return 2^31 − 1, and if the quotient is strictly less than −2^31, then return −2^31.",
  shardsReward: 75,
  testCases: [
    { input: "10, 3", expectedOutput: "3" },
    { input: "7, -3", expectedOutput: "-2" },
    { input: "-2147483648, -1", expectedOutput: "2147483647" },
    { input: "-2147483648, 1", expectedOutput: "-2147483648" }
  ]
}
,
{
    problem_id: "L0030",
  title: "Substring with Concatenation of All Words",
  difficulty: "Hard",
  description: "You are given a string s and an array of strings words. All the strings of words are of the same length.\n\nA concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.\n\nFor example, if words = [\"ab\",\"cd\",\"ef\"], then \"abcdef\", \"abefcd\", \"cdabef\", \"cdefab\", \"efabcd\", and \"efcdab\" are all concatenated strings. \"acdbef\" is not a concatenated string because it is not the concatenation of any permutation of words.\n\nReturn an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order.",
  shardsReward: 100,
  testCases: [
    {
      input: "\"barfoothefoobarman\", [\"foo\",\"bar\"]",
      expectedOutput: "[0,9]"
    },
    {
      input: "\"wordgoodgoodgoodbestword\", [\"word\",\"good\",\"best\",\"word\"]",
      expectedOutput: "[]"
    },
    {
      input: "\"barfoofoobarthefoobarman\", [\"bar\",\"foo\",\"the\"]",
      expectedOutput: "[6,9,12]"
    },
    {
      input: "\"lingmindraboofooowingdingbarrwingmonkeypoundcake\", [\"fooo\",\"barr\",\"wing\",\"ding\",\"wing\"]",
      expectedOutput: "[13]"
    }
  ]
}
,
{
    problem_id: "L0031",
  title: "Next Permutation",
  difficulty: "Medium",
  description: "A permutation of an array of integers is an arrangement of its members into a sequence or linear order.\n\nFor example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1].\nThe next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).\n\nGiven an array of integers nums, find the next permutation of nums.\n\nThe replacement must be in place and use only constant extra memory.",
  shardsReward: 75,
  testCases: [
    { input: "[1,2,3]", expectedOutput: "[1,3,2]" },
    { input: "[3,2,1]", expectedOutput: "[1,2,3]" },
    { input: "[1,1,5]", expectedOutput: "[1,5,1]" },
    { input: "[1,2,3,6,5,4]", expectedOutput: "[1,2,4,3,5,6]" }
  ]
}
,
{
    problem_id: "L0032",
  title: "Longest Valid Parentheses",
  difficulty: "Hard",
  description: "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.",
  shardsReward: 100,
  testCases: [
    { input: "\"(()\"", expectedOutput: "2" },
    { input: "\")()())\"", expectedOutput: "4" },
    { input: "\"\"", expectedOutput: "0" },
    { input: "\"()(()\"", expectedOutput: "2" },
    { input: "\"()(())\"", expectedOutput: "6" }
  ]
}
,
{
    problem_id: "L0033",
  title: "Search in Rotated Sorted Array",
  difficulty: "Medium",
  description: "There is an integer array nums sorted in ascending order (with distinct values).\n\nPrior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).\n\nGiven the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.\n\nYou must write an algorithm with O(log n) runtime complexity.",
  shardsReward: 75,
  testCases: [
    { input: "[4,5,6,7,0,1,2], 0", expectedOutput: "4" },
    { input: "[4,5,6,7,0,1,2], 3", expectedOutput: "-1" },
    { input: "[1], 0", expectedOutput: "-1" },
    { input: "[6,7,8,1,2,3,4,5], 3", expectedOutput: "5" },
    { input: "[5,1,3], 5", expectedOutput: "0" }
  ]
}
,
{
    problem_id: "L0034",
  title: "Find First and Last Position of Element in Sorted Array",
  difficulty: "Medium",
  description: "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.\n\nIf target is not found in the array, return [-1, -1].\n\nYou must write an algorithm with O(log n) runtime complexity.",
  shardsReward: 75,
  testCases: [
    { input: "[5,7,7,8,8,10], 8", expectedOutput: "[3,4]" },
    { input: "[5,7,7,8,8,10], 6", expectedOutput: "[-1,-1]" },
    { input: "[], 0", expectedOutput: "[-1,-1]" },
    { input: "[1,2,3,4,4,4,5,6], 4", expectedOutput: "[3,5]" },
    { input: "[2,2,2,2,2], 2", expectedOutput: "[0,4]" }
  ]
},
{
    problem_id: "L0035",
  title: "Search Insert Position",
  difficulty: "Easy",
  description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with O(log n) runtime complexity.",
  shardsReward: 50,
  testCases: [
    { input: "[1,3,5,6], 5", expectedOutput: "2" },
    { input: "[1,3,5,6], 2", expectedOutput: "1" },
    { input: "[1,3,5,6], 7", expectedOutput: "4" },
    { input: "[1,3,5,6], 0", expectedOutput: "0" },
    { input: "[1], 0", expectedOutput: "0" },
    { input: "[1], 1", expectedOutput: "0" },
    { input: "[1], 2", expectedOutput: "1" }
  ]
}
,
{problem_id: "L0036",
  title: "Valid Sudoku",
  difficulty: "Medium",
  description: "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:\n\n- Each row must contain the digits 1-9 without repetition.\n- Each column must contain the digits 1-9 without repetition.\n- Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.\n\nNote:\n- A Sudoku board (partially filled) could be valid but is not necessarily solvable.\n- Only the filled cells need to be validated according to the mentioned rules.",
  shardsReward: 75,
  testCases: [
    {
      input: `[
        ["5","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
      ]`,
      expectedOutput: "true"
    },
    {
      input: `[
        ["8","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
      ]`,
      expectedOutput: "false"
    }
  ]
}
,
{problem_id: "L0037",
  title: "Sudoku Solver",
  difficulty: "Hard",
  description: "Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules:\n\n- Each of the digits 1-9 must occur exactly once in each row.\n- Each of the digits 1-9 must occur exactly once in each column.\n- Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.\n\nThe '.' character indicates empty cells.",
  shardsReward: 100,
  testCases: [
    {
      input: `[["5","3",".",".","7",".",".",".","."],
               ["6",".",".","1","9","5",".",".","."],
               [".","9","8",".",".",".",".","6","."],
               ["8",".",".",".","6",".",".",".","3"],
               ["4",".",".","8",".","3",".",".","1"],
               ["7",".",".",".","2",".",".",".","6"],
               [".","6",".",".",".",".","2","8","."],
               [".",".",".","4","1","9",".",".","5"],
               [".",".",".",".","8",".",".","7","9"]]`,
      expectedOutput: `[["5","3","4","6","7","8","9","1","2"],
                        ["6","7","2","1","9","5","3","4","8"],
                        ["1","9","8","3","4","2","5","6","7"],
                        ["8","5","9","7","6","1","4","2","3"],
                        ["4","2","6","8","5","3","7","9","1"],
                        ["7","1","3","9","2","4","8","5","6"],
                        ["9","6","1","5","3","7","2","8","4"],
                        ["2","8","7","4","1","9","6","3","5"],
                        ["3","4","5","2","8","6","1","7","9"]]`
    }
  ]
}
,
{
    problem_id: "L0038",
  title: "Count and Say",
  difficulty: "Medium",
  description: "The count-and-say sequence is a sequence of digit strings defined by the recursive formula:\n\n- countAndSay(1) = \"1\"\n- countAndSay(n) is the run-length encoding of countAndSay(n - 1).\n\nRun-length encoding (RLE) is a string compression method that works by replacing consecutive identical characters with the count followed by the character. For example, to compress the string \"3322251\" we replace \"33\" with \"23\", \"222\" with \"32\", \"5\" with \"15\", and \"1\" with \"11\", resulting in \"23321511\".\n\nGiven a positive integer n, return the nth element of the count-and-say sequence.",
  shardsReward: 50,
  testCases: [
    {
      input: "4",
      expectedOutput: "\"1211\""
    },
    {
      input: "1",
      expectedOutput: "\"1\""
    }
  ]
}
,
{
    problem_id: "L0039",
  title: "Combination Sum",
  difficulty: "Medium",
  description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.\n\nThe same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.\n\nThe number of unique combinations that sum up to target is guaranteed to be less than 150 combinations for the given input.",
  shardsReward: 75,
  testCases: [
    {
      input: "[2,3,6,7], 7",
      expectedOutput: "[[2,2,3],[7]]"
    },
    {
      input: "[2,3,5], 8",
      expectedOutput: "[[2,2,2,2],[2,3,3],[3,5]]"
    },
    {
      input: "[2], 1",
      expectedOutput: "[]"
    }
  ]
}
,
{
    problem_id: "L0040",
  title: "Combination Sum II",
  difficulty: "Medium",
  description: "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.\n\nEach number in candidates may only be used once in the combination.\n\nNote: The solution set must not contain duplicate combinations.",
  shardsReward: 75,
  testCases: [
    {
      input: "[10,1,2,7,6,1,5], 8",
      expectedOutput: "[[1,1,6],[1,2,5],[1,7],[2,6]]"
    },
    {
      input: "[2,5,2,1,2], 5",
      expectedOutput: "[[1,2,2],[5]]"
    }
  ]
}
,
{
    problem_id: "L0041",
  title: "First Missing Positive",
  difficulty: "Hard",
  description: "Given an unsorted integer array nums. Return the smallest positive integer that is not present in nums.\n\nYou must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.",
  shardsReward: 100,
  testCases: [
    {
      input: "[1,2,0]",
      expectedOutput: "3"
    },
    {
      input: "[3,4,-1,1]",
      expectedOutput: "2"
    },
    {
      input: "[7,8,9,11,12]",
      expectedOutput: "1"
    }
  ]
}
,
{
    problem_id: "L0042",
  title: "Trapping Rain Water",
  difficulty: "Hard",
  description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
  shardsReward: 100,
  testCases: [
    {
      input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
      expectedOutput: "6"
    },
    {
      input: "[4,2,0,3,2,5]",
      expectedOutput: "9"
    }
  ]
}
,
{
    problem_id: "L0043",
  title: "Multiply Strings",
  difficulty: "Medium",
  description: "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.\n\nNote: You must not use any built-in BigInteger library or convert the inputs to integer directly.",
  shardsReward: 75,
  testCases: [
    {
      input: "\"2\", \"3\"",
      expectedOutput: "\"6\""
    },
    {
      input: "\"123\", \"456\"",
      expectedOutput: "\"56088\""
    }
  ]
}
,
{
    problem_id: "L0044",
  title: "Wildcard Matching",
  difficulty: "Hard",
  description: "Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:\n\n- '?' Matches any single character.\n- '*' Matches any sequence of characters (including the empty sequence).\n\nThe matching should cover the entire input string (not partial).",
  shardsReward: 100,
  testCases: [
    {
      input: "\"aa\", \"a\"",
      expectedOutput: "false"
    },
    {
      input: "\"aa\", \"*\"",
      expectedOutput: "true"
    },
    {
      input: "\"cb\", \"?a\"",
      expectedOutput: "false"
    }
  ]
},
{
    problem_id: "L0045",
  "title": "Jump Game II",
  "difficulty": "Medium",
  "description": "You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].\n\nEach element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:\n\n- 0 <= j <= nums[i] and\n- i + j < n\n\nReturn the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].",
  "shardsReward": 75,
  "testCases": [
    {
      "input": "[2,3,1,1,4]",
      "expectedOutput": "2"
    },
    {
      "input": "[2,3,0,1,4]",
      "expectedOutput": "2"
    }
  ]
}
,
{
    problem_id: "L0046",
  "title": "Permutations",
  "difficulty": "Medium",
  "description": "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
  "shardsReward": 75,
  "testCases": [
    {
      "input": "[1,2,3]",
      "expectedOutput": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
    },
    {
      "input": "[0,1]",
      "expectedOutput": "[[0,1],[1,0]]"
    },
    {
      "input": "[1]",
      "expectedOutput": "[[1]]"
    }
  ]
}
,
{
    problem_id: "L0047",
  "title": "Permutations II",
  "difficulty": "Medium",
  "description": "Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.",
  "shardsReward": 75,
  "testCases": [
    {
      "input": "[1,1,2]",
      "expectedOutput": "[[1,1,2],[1,2,1],[2,1,1]]"
    },
    {
      "input": "[1,2,3]",
      "expectedOutput": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
    }
  ]
}
,
{
    problem_id: "L0048",
  "title": "Rotate Image",
  "difficulty": "Medium",
  "description": "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).\n\nYou have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.",
  "shardsReward": 75,
  "testCases": [
    {
      "input": "[[1,2,3],[4,5,6],[7,8,9]]",
      "expectedOutput": "[[7,4,1],[8,5,2],[9,6,3]]"
    },
    {
      "input": "[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
      "expectedOutput": "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]"
    }
  ]
}
,
{
    problem_id: "L0049",
  "title": "Group Anagrams",
  "difficulty": "Medium",
  "description": "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
  "shardsReward": 75,
  "testCases": [
    {
      "input": "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
      "expectedOutput": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]"
    },
    {
      "input": "[\"\"]",
      "expectedOutput": "[[\"\"]]"
    },
    {
      "input": "[\"a\"]",
      "expectedOutput": "[[\"a\"]]"
    }
  ]
}
,
{
    problem_id: "L0050",
  "title": "Pow(x, n)",
  "difficulty": "Medium",
  "description": "Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).",
  "shardsReward": 75,
  "testCases": [
    {
      "input": "2.00000, 10",
      "expectedOutput": "1024.00000"
    },
    {
      "input": "2.10000, 3",
      "expectedOutput": "9.26100"
    },
    {
      "input": "2.00000, -2",
      "expectedOutput": "0.25000"
    }
  ]
},
];
async function insertQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Question.deleteMany();
    await Question.insertMany(questions);

    console.log('✅ Questions inserted successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error inserting questions:', err);
  }
}

insertQuestions();

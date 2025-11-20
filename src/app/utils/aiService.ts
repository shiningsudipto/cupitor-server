import { GoogleGenerativeAI } from '@google/generative-ai'
import config from '../config'
import { TAIAnalysisResult } from '../modules/resumeAnalysis/resumeAnalysis.interface'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(config.gemini_api_key || '')

/**
 * Analyze resume content using Google Gemini AI
 * @param resumeText - Extracted text from resume PDF
 * @returns AI analysis result with scores and suggestions
 */
export const analyzeResumeWithAI = async (
  resumeText: string,
): Promise<TAIAnalysisResult> => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro-latest',
    })

    const prompt = `
You are an expert ATS (Applicant Tracking System) resume analyzer. Analyze the following resume and provide a comprehensive evaluation.

RESUME CONTENT:
${resumeText}

Please analyze this resume and provide a JSON response with the following structure:
{
  "atsScore": <number 0-100>,
  "keywordScore": <number 0-100>,
  "formattingScore": <number 0-100>,
  "overallScore": <number 0-100>,
  "strengths": [<array of 3-5 key strengths>],
  "weaknesses": [<array of 3-5 key weaknesses>],
  "suggestions": [<array of 5-7 actionable improvement suggestions>],
  "matchedKeywords": [<array of important keywords found in resume>],
  "missingKeywords": [<array of commonly expected keywords that are missing>],
  "sections": {
    "hasContactInfo": <boolean>,
    "hasExperience": <boolean>,
    "hasEducation": <boolean>,
    "hasSkills": <boolean>,
    "hasSummary": <boolean>
  },
  "aiAnalysis": "<detailed 2-3 paragraph analysis of the resume>"
}

Scoring criteria:
- atsScore: How well the resume is formatted for ATS systems (clear structure, standard sections, no complex formatting)
- keywordScore: Presence of relevant industry keywords and skills
- formattingScore: Overall formatting quality, readability, and professional appearance
- overallScore: Average of the above three scores

IMPORTANT: Return ONLY valid JSON, no additional text or markdown formatting.
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean up the response - remove markdown code blocks if present
    let cleanedText = text.trim()
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '')
    }

    const analysis: TAIAnalysisResult = JSON.parse(cleanedText)

    // Validate and ensure all required fields exist
    return {
      atsScore: analysis.atsScore || 0,
      keywordScore: analysis.keywordScore || 0,
      formattingScore: analysis.formattingScore || 0,
      overallScore: analysis.overallScore || 0,
      strengths: analysis.strengths || [],
      weaknesses: analysis.weaknesses || [],
      suggestions: analysis.suggestions || [],
      matchedKeywords: analysis.matchedKeywords || [],
      missingKeywords: analysis.missingKeywords || [],
      sections: analysis.sections || {
        hasContactInfo: false,
        hasExperience: false,
        hasEducation: false,
        hasSkills: false,
        hasSummary: false,
      },
      aiAnalysis: analysis.aiAnalysis || 'Analysis completed.',
    }
  } catch (error) {
    console.error('Error analyzing resume with AI:', error)
    throw new Error('Failed to analyze resume with AI')
  }
}

/**
 * Analyze resume against a specific job description
 * @param resumeText - Extracted text from resume PDF
 * @param jobDescription - Job description and requirements
 * @param jobTitle - Title of the job
 * @param requiredSkills - Array of required skills for the job
 * @returns AI analysis result with job-specific insights
 */
export const analyzeResumeForJob = async (
  resumeText: string,
  jobDescription: string,
  jobTitle: string,
  requiredSkills: string[],
): Promise<TAIAnalysisResult> => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro-latest',
    })

    const prompt = `
You are an expert ATS (Applicant Tracking System) resume analyzer. Analyze how well the following resume matches the job requirements.

JOB TITLE: ${jobTitle}

JOB DESCRIPTION:
${jobDescription}

REQUIRED SKILLS:
${requiredSkills.join(', ')}

RESUME CONTENT:
${resumeText}

Please analyze this resume against the job requirements and provide a JSON response with the following structure:
{
  "atsScore": <number 0-100>,
  "keywordScore": <number 0-100 - how well resume matches job keywords>,
  "formattingScore": <number 0-100>,
  "overallScore": <number 0-100>,
  "strengths": [<array of 3-5 strengths relevant to this job>],
  "weaknesses": [<array of 3-5 weaknesses or gaps for this job>],
  "suggestions": [<array of 5-7 suggestions to better match this job>],
  "matchedKeywords": [<array of job-required keywords found in resume>],
  "missingKeywords": [<array of job-required keywords missing from resume>],
  "sections": {
    "hasContactInfo": <boolean>,
    "hasExperience": <boolean>,
    "hasEducation": <boolean>,
    "hasSkills": <boolean>,
    "hasSummary": <boolean>
  },
  "aiAnalysis": "<detailed 2-3 paragraph analysis of how well the resume matches this specific job>"
}

Scoring criteria:
- atsScore: How well the resume is formatted for ATS systems
- keywordScore: How many required skills and keywords from the job description are present in the resume
- formattingScore: Overall formatting quality and readability
- overallScore: Weighted average emphasizing keyword matching (40% keyword, 30% ATS, 30% formatting)

IMPORTANT: Return ONLY valid JSON, no additional text or markdown formatting.
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean up the response
    let cleanedText = text.trim()
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '')
    }

    const analysis: TAIAnalysisResult = JSON.parse(cleanedText)

    return {
      atsScore: analysis.atsScore || 0,
      keywordScore: analysis.keywordScore || 0,
      formattingScore: analysis.formattingScore || 0,
      overallScore: analysis.overallScore || 0,
      strengths: analysis.strengths || [],
      weaknesses: analysis.weaknesses || [],
      suggestions: analysis.suggestions || [],
      matchedKeywords: analysis.matchedKeywords || [],
      missingKeywords: analysis.missingKeywords || [],
      sections: analysis.sections || {
        hasContactInfo: false,
        hasExperience: false,
        hasEducation: false,
        hasSkills: false,
        hasSummary: false,
      },
      aiAnalysis: analysis.aiAnalysis || 'Analysis completed.',
    }
  } catch (error) {
    console.error('Error analyzing resume for job with AI:', error)
    throw new Error('Failed to analyze resume for job with AI')
  }
}

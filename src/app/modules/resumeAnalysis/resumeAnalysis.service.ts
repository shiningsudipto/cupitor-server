import axios from 'axios'
import { ResumeAnalysis } from './resumeAnalysis.model'
import { TResumeAnalysis } from './resumeAnalysis.interface'
import { analyzeResumeWithAI, analyzeResumeForJob } from '../../utils/aiService'
import { JobModel } from '../job/job.model'

/**
 * Parse PDF resume and extract text content
 * @param pdfPathOrUrl - Local file path or URL of the PDF file
 * @returns Extracted text from PDF
 */
const parsePDFResume = async (pdfPathOrUrl: string): Promise<string> => {
  try {
    let dataBuffer: Buffer

    // Check if it's a URL or local file path
    if (
      pdfPathOrUrl.startsWith('http://') ||
      pdfPathOrUrl.startsWith('https://')
    ) {
      // Download PDF from URL
      const response = await axios.get(pdfPathOrUrl, {
        responseType: 'arraybuffer',
      })
      dataBuffer = Buffer.from(response.data)
    } else {
      // Read from local file system
      const fs = require('fs').promises
      dataBuffer = await fs.readFile(pdfPathOrUrl)
    }

    // Parse PDF - pdf-parse is a CommonJS module
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pdfParse = require('pdf-parse')
    const data = await pdfParse(dataBuffer)

    return data.text
  } catch (error) {
    console.error('Error parsing PDF:', error)
    throw new Error('Failed to parse PDF resume')
  }
}

/**
 * Analyze resume from PDF - General ATS analysis
 * @param candidateId - ID of the candidate
 * @param filePath - Local file path or URL to read the PDF from
 * @param resumeUrl - URL to store in database (for reference)
 * @param resumeId - Optional resume ID reference
 * @returns Created resume analysis document
 */
const analyzeResumeFromPDF = async (
  candidateId: string,
  filePath: string,
  resumeUrl: string,
  resumeId?: string,
): Promise<TResumeAnalysis> => {
  try {
    // Parse PDF to extract text from the file path
    const parsedContent = await parsePDFResume(filePath)

    // Analyze with AI
    const aiResult = await analyzeResumeWithAI(parsedContent)

    // Create analysis document
    const analysisData = {
      candidateId,
      resumeId,
      resumeUrl, // Store the URL for reference
      parsedContent,
      analysisType: 'general' as const,
      ...aiResult,
    }

    const result = await ResumeAnalysis.create(analysisData)
    return result
  } catch (error) {
    console.error('Error analyzing resume:', error)
    throw new Error('Failed to analyze resume')
  }
}

/**
 * Analyze resume against a specific job posting
 * @param candidateId - ID of the candidate
 * @param jobId - ID of the job posting
 * @param filePath - Local file path or URL to read the PDF from
 * @param resumeUrl - URL to store in database (for reference)
 * @param resumeId - Optional resume ID reference
 * @returns Created resume analysis document with job-specific insights
 */
const analyzeResumeForJobPosting = async (
  candidateId: string,
  jobId: string,
  filePath: string,
  resumeUrl: string,
  resumeId?: string,
): Promise<TResumeAnalysis> => {
  try {
    // Get job details
    const job = await JobModel.findById(jobId).populate('jobType')
    if (!job) {
      throw new Error('Job not found')
    }

    // Parse PDF to extract text from the file path
    const parsedContent = await parsePDFResume(filePath)

    // Analyze with AI against job requirements
    const aiResult = await analyzeResumeForJob(
      parsedContent,
      job.description + '\n\nRequirements:\n' + job.requirements,
      job.title,
      job.skills || [],
    )

    // Create analysis document
    const analysisData = {
      candidateId,
      jobId,
      resumeId,
      resumeUrl, // Store the URL for reference
      parsedContent,
      analysisType: 'job-specific' as const,
      ...aiResult,
    }

    const result = await ResumeAnalysis.create(analysisData)
    return result
  } catch (error) {
    console.error('Error analyzing resume for job:', error)
    throw new Error('Failed to analyze resume for job')
  }
}

/**
 * Analyze resume for job using existing analysis
 * @param candidateId - ID of the candidate
 * @param jobId - ID of the job posting
 * @param resumeAnalysisId - ID of the existing resume analysis
 * @returns Created resume analysis document
 */
const analyzeResumeForJobFromExistingAnalysis = async (
  candidateId: string,
  jobId: string,
  resumeAnalysisId: string,
): Promise<TResumeAnalysis> => {
  try {
    // Get existing analysis
    const existingAnalysis = await ResumeAnalysis.findById(resumeAnalysisId)
    if (!existingAnalysis) {
      throw new Error('Resume analysis not found')
    }

    // Get job details
    const job = await JobModel.findById(jobId).populate('jobType')
    if (!job) {
      throw new Error('Job not found')
    }

    // Analyze with AI against job requirements
    const aiResult = await analyzeResumeForJob(
      existingAnalysis.parsedContent,
      job.description + '\n\nRequirements:\n' + job.requirements,
      job.title,
      job.skills || [],
    )

    // Create analysis document
    const analysisData = {
      candidateId,
      jobId,
      resumeId: existingAnalysis.resumeId,
      resumeUrl: existingAnalysis.resumeUrl,
      parsedContent: existingAnalysis.parsedContent,
      analysisType: 'job-specific' as const,
      ...aiResult,
    }

    const result = await ResumeAnalysis.create(analysisData)
    return result
  } catch (error) {
    console.error('Error analyzing resume for job from existing:', error)
    throw new Error('Failed to analyze resume for job from existing analysis')
  }
}

/**
 * Get analysis by ID
 * @param id - Analysis ID
 * @returns Resume analysis document
 */
const getAnalysisById = async (id: string): Promise<TResumeAnalysis | null> => {
  const result = await ResumeAnalysis.findById(id)
    .populate('candidateId', 'name email')
    .populate('jobId', 'title')
    .populate('resumeId')
  return result
}

/**
 * Get all analyses for a candidate
 * @param candidateId - Candidate ID
 * @returns Array of resume analyses
 */
const getCandidateAnalyses = async (
  candidateId: string,
): Promise<TResumeAnalysis[]> => {
  const result = await ResumeAnalysis.find({ candidateId })
    .populate('jobId', 'title')
    .populate('resumeId')
    .sort({ createdAt: -1 })
  return result
}

/**
 * Get all analyses
 * @returns Array of all resume analyses
 */
const getAllAnalyses = async (): Promise<TResumeAnalysis[]> => {
  const result = await ResumeAnalysis.find()
    .populate('candidateId', 'name email')
    .populate('jobId', 'title')
    .populate('resumeId')
    .sort({ createdAt: -1 })
  return result
}

/**
 * Delete analysis by ID
 * @param id - Analysis ID
 * @returns Deleted analysis document
 */
const deleteAnalysis = async (id: string): Promise<TResumeAnalysis | null> => {
  const result = await ResumeAnalysis.findByIdAndDelete(id)
  return result
}

export const resumeAnalysisServices = {
  analyzeResumeFromPDF,
  analyzeResumeForJobPosting,
  analyzeResumeForJobFromExistingAnalysis,
  getAnalysisById,
  getCandidateAnalyses,
  getAllAnalyses,
  deleteAnalysis,
}

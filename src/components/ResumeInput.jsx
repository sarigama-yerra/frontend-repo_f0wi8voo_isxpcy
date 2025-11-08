import { useState, useRef } from 'react'
import { UploadCloud, FileText, Trash2 } from 'lucide-react'

export default function ResumeInput({ onAnalyze }) {
  const [text, setText] = useState('')
  const [jobTitle, setJobTitle] = useState('Software Engineer')
  const [file, setFile] = useState(null)
  const [uploadMode, setUploadMode] = useState('text') // 'text' | 'file' | 'both'
  const fileRef = useRef()

  const handleDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) setFile(f)
  }

  const handleAnalyze = async () => {
    if (!jobTitle.trim()) return
    await onAnalyze({ text, jobTitle, file, mode: uploadMode })
  }

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-4 sm:p-6 border-b bg-gradient-to-r from-indigo-50 to-cyan-50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Your Resume</h2>
          <p className="text-xs text-gray-500">Paste text, upload a file, or combine both.</p>
        </div>
        <select
          value={uploadMode}
          onChange={(e) => setUploadMode(e.target.value)}
          className="text-sm border rounded-md px-2 py-1 bg-white"
        >
          <option value="text">Text only</option>
          <option value="file">File only</option>
          <option value="both">Text + File</option>
        </select>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {(uploadMode === 'text' || uploadMode === 'both') && (
          <div>
            <label className="text-sm font-medium text-gray-700">Paste resume text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your resume content here..."
              className="mt-2 w-full h-52 rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {(uploadMode === 'file' || uploadMode === 'both') && (
          <div>
            <label className="text-sm font-medium text-gray-700">Upload PDF or TXT</label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="mt-2 h-52 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500"
            >
              {file ? (
                <div className="flex items-center gap-3 text-gray-700">
                  <FileText />
                  <span className="text-sm font-medium">{file.name}</span>
                  <button
                    className="ml-2 text-red-500 hover:text-red-600"
                    onClick={() => { setFile(null); fileRef.current.value = '' }}
                    aria-label="Remove file"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <UploadCloud className="mx-auto mb-2" />
                  <p className="text-sm">Drag and drop or click to upload</p>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.txt"
                className="absolute opacity-0 w-full h-52 cursor-pointer"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                title="Upload file"
              />
            </div>
          </div>
        )}

        <div className="md:col-span-2 grid sm:grid-cols-2 gap-4 items-end">
          <div>
            <label className="text-sm font-medium text-gray-700">Target role</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Data Scientist"
              className="mt-2 w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={handleAnalyze}
            className="h-12 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow"
          >
            Analyze Resume
          </button>
        </div>
      </div>
    </section>
  )
}

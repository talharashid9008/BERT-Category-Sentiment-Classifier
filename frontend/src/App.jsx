import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [review, setReview] = useState('');
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    setCategory(null);
    setRating(null);

    try {
      const response = await axios.post('http://localhost:5000/api/predict', { review });
      setCategory(response.data.category);
      setRating(response.data.rating);
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Failed to analyze text. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = () => {
    if (rating === null) return 'bg-gray-100 text-gray-800';
    if (rating <= 1) return 'bg-red-100 text-red-800'; // Negative
    if (rating === 2) return 'bg-yellow-100 text-yellow-800'; // Neutral
    return 'bg-green-100 text-green-800'; // Positive
  };

  const getSentimentIcon = () => {
    if (rating === null) return null;
    if (rating <= 1) return '👎';
    if (rating === 2) return '🤔';
    return '👍';
  };

  const getSentimentText = () => {
    if (rating === null) return '';
    if (rating <= 1) return 'Negative';
    if (rating === 2) return 'Neutral';
    return 'Positive';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Card Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="bg-indigo-600 p-6">
            <h1 className="text-2xl font-bold text-white">Sentiment Analysis</h1>
            <p className="text-indigo-100 mt-1">Analyze the emotional tone of your text</p>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Text Input Container */}
              <div className="space-y-2">
                <label 
                  htmlFor="review" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter your text
                </label>
                <div className="relative">
                  <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    rows={6}
                    placeholder="Type or paste your text here to analyze sentiment..."
                    disabled={loading}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {review.length}/1000
                  </div>
                </div>
              </div>

              {/* Button Container */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-lg font-medium text-white transition-all flex items-center space-x-2 ${
                    loading 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow-md'
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Analyze Text</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r flex items-start">
                <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {(category || rating !== null) && (
            <div className="border-t border-gray-200 p-6 bg-slate-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Analysis Results</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Card */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Category</h3>
                  <p className="text-xl font-semibold text-indigo-600">{category}</p>
                </div>
                
                {/* Sentiment Card */}
                {rating !== null && (
                  <div className={`p-4 rounded-lg border ${getSentimentColor()} border-transparent`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xs font-medium uppercase tracking-wider mb-1">Sentiment</h3>
                        <p className="text-xl font-semibold">
                          {getSentimentText()} <span className="text-sm font-normal">({rating}/4)</span>
                        </p>
                      </div>
                      <span className="text-3xl">{getSentimentIcon()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* New Analysis Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    setReview('');
                    setCategory(null);
                    setRating(null);
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Perform new analysis
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Sentiment Analysis Tool • Powered by BERT • Classifier
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import { FaExclamationTriangle, FaRefresh, FaHome } from 'react-icons/fa';

// Error Boundary Class Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback 
          error={this.state.error}
          resetError={() => this.setState({ hasError: false, error: null, errorInfo: null })}
        />
      );
    }

    return this.props.children;
  }
}

// Error Fallback Component
const ErrorFallback = ({ error, resetError }) => {
  const handleRefresh = () => {
    resetError();
    window.location.reload();
  };

  const handleGoHome = () => {
    resetError();
    window.location.href = '/admin/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <FaExclamationTriangle className="text-red-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Terjadi Kesalahan
          </h2>
          <p className="text-gray-600">
            Maaf, terjadi kesalahan yang tidak terduga. Tim kami telah diberitahu dan sedang menangani masalah ini.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="font-semibold text-gray-800 mb-2">Error Details:</h3>
            <pre className="text-xs text-red-600 overflow-auto">
              {error.toString()}
            </pre>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleRefresh}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <FaRefresh className="text-sm" />
            Muat Ulang Halaman
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <FaHome className="text-sm" />
            Kembali ke Dashboard
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Jika masalah terus berlanjut, silakan hubungi tim support.
          </p>
        </div>
      </div>
    </div>
  );
};

// Simple Error Component for specific errors
export const ErrorMessage = ({ 
  title = 'Terjadi Kesalahan',
  message = 'Silakan coba lagi nanti.',
  onRetry,
  showRetry = true
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="mb-4">
        <FaExclamationTriangle className="mx-auto text-red-500 text-3xl mb-2" />
        <h3 className="text-lg font-semibold text-red-800">{title}</h3>
        <p className="text-red-600 mt-1">{message}</p>
      </div>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
};

// Network Error Component
export const NetworkError = ({ onRetry }) => {
  return (
    <ErrorMessage
      title="Koneksi Bermasalah"
      message="Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
      onRetry={onRetry}
    />
  );
};

// Not Found Component
export const NotFound = ({ message = 'Data yang Anda cari tidak ditemukan.' }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
      <div className="mb-4">
        <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <span className="text-gray-500 text-2xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Tidak Ditemukan</h3>
        <p className="text-gray-600 mt-1">{message}</p>
      </div>
    </div>
  );
};

export default ErrorBoundary;

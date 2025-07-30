import React, { useState } from 'react';

const TestLogin = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testUserLogin = async () => {
    setLoading(true);
    setTestResult('Testing...');
    
    try {
      // Test dengan credentials user yang ada di MongoDB
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: 'user@example.com', // Ganti dengan email user yang ada di DB
          password: 'password123'    // Ganti dengan password yang sesuai
        }),
      });

      const data = await response.json();
      
      console.log('Test Response Status:', response.status);
      console.log('Test Response Data:', data);
      
      if (response.ok) {
        setTestResult(`✅ Login berhasil!\nToken: ${data.token || data.data?.token}\nUser: ${JSON.stringify(data.user || data.data?.user, null, 2)}`);
      } else {
        setTestResult(`❌ Login gagal!\nStatus: ${response.status}\nError: ${data.message || data.error || 'Unknown error'}\nFull Response: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      setTestResult(`❌ Network Error: ${error.message}`);
      console.error('Test Login Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testBackendConnection = async () => {
    setLoading(true);
    setTestResult('Testing backend connection...');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/test', {
        method: 'GET',
      });
      
      if (response.ok) {
        const data = await response.json();
        setTestResult(`✅ Backend connected!\nResponse: ${JSON.stringify(data, null, 2)}`);
      } else {
        setTestResult(`❌ Backend connection failed!\nStatus: ${response.status}`);
      }
    } catch (error) {
      setTestResult(`❌ Backend tidak dapat diakses: ${error.message}\nPastikan server backend berjalan di http://localhost:5000`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Test Login User</h2>
      
      <div className="space-y-4">
        <button
          onClick={testBackendConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Backend Connection'}
        </button>
        
        <button
          onClick={testUserLogin}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 ml-2"
        >
          {loading ? 'Testing...' : 'Test User Login'}
        </button>
      </div>
      
      {testResult && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Test Result:</h3>
          <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold text-yellow-800 mb-2">Instruksi:</h3>
        <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
          <li>Pastikan backend server berjalan di http://localhost:5000</li>
          <li>Ganti email dan password di kode dengan akun user yang ada di MongoDB</li>
          <li>Klik "Test Backend Connection" untuk memastikan koneksi</li>
          <li>Klik "Test User Login" untuk test login user</li>
        </ol>
      </div>
    </div>
  );
};

export default TestLogin;

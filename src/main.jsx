import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './App.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '', errorComponent: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // คุณสามารถจัดเก็บข้อมูลเพิ่มเติมเกี่ยวกับข้อผิดพลาดได้ที่นี่
    console.error('Error caught in ErrorBoundary:', error, info);
    
    // เก็บชื่อคอมโพเนนต์ที่มีปัญหา
    const errorComponentName = info.componentStack.split('\n')[1]?.trim();
    this.setState({ errorMessage: error.message, errorComponent: errorComponentName });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>เกิดข้อผิดพลาดในคอมโพเนนต์: {this.state.errorComponent}</h1>
          <p>รายละเอียด: {this.state.errorMessage}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

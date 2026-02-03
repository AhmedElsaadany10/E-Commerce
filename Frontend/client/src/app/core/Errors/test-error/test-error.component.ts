import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface TestResponse {
  message?: string;
  status?: number;
  errors?: any;
  timestamp?: string;
}

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  standalone:false,
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  //baseUrl: string = 'https://localhost:7070/api/';
   baseUrl: string = 'http://localhost:5053/api/';
  
  isLoading: boolean = false;
  currentError: TestResponse | null = null;
  errorType: string = '';
  testHistory: Array<{type: string, response: TestResponse, timestamp: Date}> = [];
  
  errorTypes = [
    {
      id: '400',
      name: 'Bad Request',
      description: 'Invalid request parameters',
      method: () => this.get400Error()
    },
    {
      id: '401',
      name: 'Unauthorized',
      description: 'Authentication required',
      method: () => this.get401Error()
    },
    {
      id: '403',
      name: 'Forbidden',
      description: 'Insufficient permissions',
      method: () => this.get403Error()
    },
    {
      id: '404',
      name: 'Not Found',
      description: 'Resource not found',
      method: () => this.get404Error()
    },
    {
      id: '500',
      name: 'Server Error',
      description: 'Internal server error',
      method: () => this.get500Error()
    },
    {
      id: 'validation',
      name: 'Validation Error',
      description: 'Input validation failed',
      method: () => this.getValidationError()
    }
  ];


  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Removed the throwing error from ngOnInit
    this.loadTestHistory();
  }

  private loadTestHistory(): void {
    // Load previous test history from localStorage
    const savedHistory = localStorage.getItem('errorTestHistory');
    if (savedHistory) {
      this.testHistory = JSON.parse(savedHistory);
    }
  }

  private saveToHistory(errorType: string, response: TestResponse): void {
    const testEntry = {
      type: errorType,
      response: response,
      timestamp: new Date()
    };
    
    this.testHistory.unshift(testEntry);
    // Keep only last 10 entries
    if (this.testHistory.length > 10) {
      this.testHistory = this.testHistory.slice(0, 10);
    }
    
    localStorage.setItem('errorTestHistory', JSON.stringify(this.testHistory));
  }

  private handleError(error: HttpErrorResponse, errorType: string): void {
    const errorResponse: TestResponse = {
      message: error.error?.message || error.message,
      status: error.status,
      errors: error.error?.errors,
      timestamp: new Date().toISOString()
    };
    
    this.currentError = errorResponse;
    this.errorType = errorType;
    this.saveToHistory(errorType, errorResponse);
    
    // Show appropriate toast notification
    // switch (error.status) {
    //   case 400:
    //     this.toastr.warning('Bad Request: Invalid parameters provided');
    //     break;
    //   case 401:
    //     this.toastr.warning('Unauthorized: Authentication required');
    //     break;
    //   case 403:
    //     this.toastr.warning('Forbidden: Insufficient permissions');
    //     break;
    //   case 404:
    //     this.toastr.error('Not Found: Resource does not exist');
    //     break;
    //   case 500:
    //     this.toastr.error('Server Error: Internal server issue');
    //     break;
    //   default:
    //     this.toastr.error(`Error ${error.status}: ${error.message}`);
    // }
  }

  private handleSuccess(response: any, errorType: string): void {
    const successResponse: TestResponse = {
      message: response?.message || 'Request successful',
      status: 200,
      timestamp: new Date().toISOString()
    };
    
    this.currentError = successResponse;
    this.errorType = errorType;
    this.saveToHistory(errorType, successResponse);
    this.toastr.success('Test completed successfully');
  }

  private testError(endpoint: string, errorType: string): void {
    this.isLoading = true;
    this.currentError = null;
    
    this.http.get(`${this.baseUrl}Bugs/${endpoint}`).subscribe({
      next: (response) => {
        this.handleSuccess(response, errorType);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error, errorType);
        this.isLoading = false;
      }
    });
  }

  // Individual error test methods
  get400Error(): void {
    this.testError('bad-request', '400 Bad Request');
  }

  get401Error(): void {
    this.testError('unauthorized', '401 Unauthorized');
  }

  get403Error(): void {
    this.testError('forbidden', '403 Forbidden');
  }

  get404Error(): void {
    this.testError('not-found', '404 Not Found');
  }

  get500Error(): void {
    this.testError('server-error', '500 Server Error');
  }

  getValidationError(): void {
    this.testError('validation-error', 'Validation Error');
  }

  testAllErrors(): void {
    const tests = [
      { method: this.get400Error.bind(this), delay: 1000 },
      { method: this.get401Error.bind(this), delay: 2000 },
      { method: this.get403Error.bind(this), delay: 3000 },
      { method: this.get404Error.bind(this), delay: 4000 },
      { method: this.get500Error.bind(this), delay: 5000 },
      { method: this.getValidationError.bind(this), delay: 6000 }
    ];

    tests.forEach((test, index) => {
      setTimeout(() => test.method(), test.delay);
    });
  }

  clearCurrentError(): void {
    this.currentError = null;
    this.errorType = '';
  }

  clearHistory(): void {
    this.testHistory = [];
    localStorage.removeItem('errorTestHistory');
    this.toastr.info('Test history cleared');
  }

  copyErrorToClipboard(): void {
    if (!this.currentError) return;
    
    const errorText = JSON.stringify(this.currentError, null, 2);
    navigator.clipboard.writeText(errorText).then(() => {
      this.toastr.success('Error details copied to clipboard');
    }).catch(() => {
      this.toastr.error('Failed to copy to clipboard');
    });
  }

  formatJson(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  getStatusColor(status: number | undefined): string {
    if (!status) return 'secondary';
    
    if (status >= 200 && status < 300) return 'success';
    if (status >= 400 && status < 500) return 'warning';
    if (status >= 500) return 'danger';
    return 'info';
  }

  retryLastTest(): void { 
    if (this.testHistory.length > 0) {
      const lastTest = this.testHistory[0];
      const methodName = lastTest.type.toLowerCase().replace(/\s+/g, '');
      const method = (this as any)[`get${methodName}`];
      if (method && typeof method === 'function') {
        method.call(this);
      }
    }
  }
}






# API Documentation

## 🔗 API Overview

The Legal Document Analysis AI Platform provides a comprehensive REST API for integrating document analysis capabilities into existing legal workflows and third-party applications.

## 🚀 Getting Started

### Base URL
```
https://api.legaldocanalysis.com/v1
```

### Authentication
```javascript
headers: {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
}
```

### Rate Limits
- **Free Tier**: 100 requests per hour
- **Professional**: 1,000 requests per hour  
- **Enterprise**: 10,000 requests per hour

## 📄 Document Analysis Endpoints

### Upload Document
**POST** `/documents/upload`

Upload a document for AI analysis.

#### Request
```javascript
// Form Data
const formData = new FormData();
formData.append('file', documentFile);
formData.append('analysis_type', 'comprehensive'); // optional
formData.append('priority', 'standard'); // optional

fetch('/api/documents/upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});
```

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | Yes | Document file (PDF, DOC, DOCX, TXT) |
| `analysis_type` | String | No | Type of analysis: `comprehensive`, `risk_only`, `compliance` |
| `priority` | String | No | Processing priority: `low`, `standard`, `high` |

#### Response
```json
{
  "success": true,
  "data": {
    "document_id": "doc_123456789",
    "status": "processing",
    "estimated_completion": "2024-01-15T10:30:00Z",
    "analysis_types": ["risk_assessment", "compliance_check"],
    "file_info": {
      "name": "contract.pdf",
      "size": 2048576,
      "pages": 15,
      "type": "application/pdf"
    }
  }
}
```

### Get Analysis Status
**GET** `/documents/{document_id}/status`

Check the processing status of a document analysis.

#### Response
```json
{
  "success": true,
  "data": {
    "document_id": "doc_123456789",
    "status": "completed",
    "progress": 100,
    "started_at": "2024-01-15T10:15:00Z",
    "completed_at": "2024-01-15T10:28:00Z",
    "analysis_url": "/documents/doc_123456789/analysis"
  }
}
```

### Get Analysis Results
**GET** `/documents/{document_id}/analysis`

Retrieve complete analysis results for a processed document.

#### Response
```json
{
  "success": true,
  "data": {
    "document_id": "doc_123456789",
    "overall_risk_score": 75,
    "analysis": {
      "executive_summary": "High-risk contract with several concerning clauses...",
      "risk_breakdown": {
        "contract_terms": {
          "score": 80,
          "level": "high",
          "issues": [
            {
              "type": "liability_clause",
              "severity": "high",
              "description": "Unlimited liability exposure identified",
              "location": "Section 8.2",
              "recommendation": "Consider liability cap provisions"
            }
          ]
        },
        "compliance": {
          "score": 45,
          "level": "medium",
          "issues": []
        },
        "financial_risk": {
          "score": 85,
          "level": "high", 
          "issues": []
        }
      },
      "key_findings": [
        "Indemnification clause heavily favors counterparty",
        "Termination provisions lack mutual reciprocity",
        "Payment terms exceed industry standard"
      ],
      "recommendations": [
        "Negotiate liability limitations",
        "Add mutual termination rights",
        "Propose payment term modifications"
      ]
    },
    "metadata": {
      "document_type": "service_agreement",
      "parties": ["Company A", "Company B"],
      "effective_date": "2024-02-01",
      "expiration_date": "2025-02-01",
      "jurisdiction": "New York",
      "language": "English"
    }
  }
}
```

## 📊 Analytics Endpoints

### Get Usage Statistics
**GET** `/analytics/usage`

Retrieve usage statistics for your API account.

#### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `start_date` | String | Start date (YYYY-MM-DD) |
| `end_date` | String | End date (YYYY-MM-DD) |
| `granularity` | String | `daily`, `weekly`, `monthly` |

#### Response
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2024-01-01",
      "end": "2024-01-31"
    },
    "metrics": {
      "total_documents": 245,
      "total_api_calls": 1247,
      "average_processing_time": 45.2,
      "success_rate": 99.2
    },
    "daily_breakdown": [
      {
        "date": "2024-01-01",
        "documents": 8,
        "api_calls": 42,
        "avg_processing_time": 43.1
      }
    ]
  }
}
```

## 🔄 Webhook Integration

### Configure Webhooks
**POST** `/webhooks/configure`

Set up webhook endpoints to receive real-time analysis updates.

#### Request
```json
{
  "url": "https://your-domain.com/webhook",
  "events": ["analysis.completed", "analysis.failed"],
  "secret": "your_webhook_secret"
}
```

#### Webhook Payload Example
```json
{
  "event": "analysis.completed",
  "timestamp": "2024-01-15T10:28:00Z",
  "data": {
    "document_id": "doc_123456789",
    "status": "completed",
    "overall_risk_score": 75,
    "analysis_url": "/documents/doc_123456789/analysis"
  }
}
```

## 📁 Document Management

### List Documents
**GET** `/documents`

Retrieve a list of processed documents.

#### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | Integer | Page number (default: 1) |
| `limit` | Integer | Items per page (max: 100) |
| `status` | String | Filter by status: `processing`, `completed`, `failed` |
| `date_from` | String | Filter from date (YYYY-MM-DD) |
| `date_to` | String | Filter to date (YYYY-MM-DD) |

#### Response
```json
{
  "success": true,
  "data": {
    "documents": [
      {
        "document_id": "doc_123456789",
        "filename": "contract.pdf",
        "status": "completed",
        "overall_risk_score": 75,
        "created_at": "2024-01-15T10:15:00Z",
        "completed_at": "2024-01-15T10:28:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_documents": 245,
      "per_page": 50
    }
  }
}
```

### Delete Document
**DELETE** `/documents/{document_id}`

Remove a document and its analysis data.

#### Response
```json
{
  "success": true,
  "message": "Document and analysis data successfully deleted"
}
```

## 🔧 Utility Endpoints

### Health Check
**GET** `/health`

Check API service status.

#### Response
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "services": {
    "ai_engine": "operational",
    "database": "operational",
    "file_storage": "operational"
  }
}
```

### Supported Formats
**GET** `/formats`

Get list of supported document formats.

#### Response
```json
{
  "success": true,
  "data": {
    "supported_formats": [
      {
        "extension": "pdf",
        "mime_type": "application/pdf",
        "max_size_mb": 50,
        "features": ["text_extraction", "ocr_support"]
      },
      {
        "extension": "docx",
        "mime_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "max_size_mb": 25,
        "features": ["text_extraction", "structure_analysis"]
      }
    ]
  }
}
```

## ⚠️ Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_DOCUMENT_FORMAT",
    "message": "The uploaded file format is not supported",
    "details": {
      "supported_formats": ["pdf", "doc", "docx", "txt"],
      "received_format": "xlsx"
    }
  }
}
```

### Common Error Codes
| Code | Description |
|------|-------------|
| `INVALID_API_KEY` | Authentication failed |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `DOCUMENT_NOT_FOUND` | Document ID not found |
| `INVALID_DOCUMENT_FORMAT` | Unsupported file format |
| `DOCUMENT_TOO_LARGE` | File size exceeds limit |
| `PROCESSING_FAILED` | Analysis engine error |
| `INSUFFICIENT_CREDITS` | Account credit limit reached |

## 🔐 Security

### API Key Management
- Generate API keys in your dashboard
- Rotate keys regularly for security
- Use different keys for different environments
- Monitor API key usage

### Data Protection
- All data transmitted via HTTPS
- Documents encrypted at rest
- Automatic data retention policies
- GDPR and CCPA compliant

## 📚 SDK Libraries

### JavaScript/Node.js
```bash
npm install legal-doc-analysis-sdk
```

```javascript
import { LegalDocAnalysis } from 'legal-doc-analysis-sdk';

const client = new LegalDocAnalysis('your_api_key');

const analysis = await client.analyzeDocument('path/to/document.pdf');
console.log(analysis.riskScore);
```

### Python
```bash
pip install legal-doc-analysis
```

```python
from legal_doc_analysis import Client

client = Client('your_api_key')
analysis = client.analyze_document('path/to/document.pdf')
print(f"Risk Score: {analysis.risk_score}")
```
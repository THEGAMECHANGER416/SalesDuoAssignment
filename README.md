# Meeting Notes Processor

This project is a simple server that processes meeting notes using the Gemini API and returns structured JSON output.

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/THEGAMECHANGER416/SalesDuoAssignment.git
cd SalesDuoAssignment
````

### 2. Create `.env` File

In the root folder, copy `.env.dist` to `.env`:

```bash
cp .env.dist .env
```

Then open `.env` and add your **Gemini API key**:

```env
GEMINI_API_KEY=your_api_key_here
```

> ⚠️ Do **not** commit your `.env` file to version control.

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
npm start
```

By default, the server runs on:
`http://localhost:3000`

---

## 📥 API Usage

### POST `/process-meeting`

Send a POST request with raw meeting notes in the body as plain text.

* **Endpoint:** `http://localhost:3000/process-meeting`
* **Content-Type:** `text/plain`
* **Request Body:** Raw meeting notes as plain text
* **Response:** JSON summary/analysis of the meeting

### Example with `curl`:

```bash
curl  -X POST \
  'http://localhost:3000/process-meeting' \
  --header 'Accept: */*' \
  --header 'Content-Type: text/plain' \
  --data-raw 'Team Sync – May 26

- We’ll launch the new product on June 10.
- Ravi to prepare onboarding docs by June 5.
- Priya will follow up with logistics team on packaging delay.
- Beta users requested a mobile-first dashboard.'
```

### Example Response:

```json
{
  "summary": "The team discussed the upcoming product launch scheduled for June 10th. Key action items were assigned to prepare for the launch and address feedback from beta users regarding the dashboard.",
  "decisions": [
    "New product launch date confirmed for June 10.",
    "Beta users requested a mobile-first dashboard."
  ],
  "actionItems": [
    {
      "task": "Prepare onboarding docs",
      "owner": "Ravi",
      "due": "June 5"
    },
    {
      "task": "Follow up with logistics team on packaging delay",
      "owner": "Priya"
    }
  ]
}
```

---

## 🛠️ Notes

* Ensure your Gemini API key has the necessary access to process natural language input.
* The server must be restarted if `.env` is changed after starting.
* If using Windows and your API key contains special characters, wrap it in quotes in `.env`.

---

## 🧪 Testing

You can test using tools like:

* [Postman](https://www.postman.com/)
* `curl` (as shown above)
* A simple HTML form or frontend client
# Voice Message Processor

## Description

This Vue + Express web app allows users to record two separate voice messages and outputs a combined audio message, where the second message plays after the first one ends.

## Dependencies

The backend audio processing depends on having [FFmpeg](https://ffmpeg.org/) installed on your device. Please ensure that FFmpeg is correctly installed and accessible through your command line interface (CLI).

#### Checking FFmpeg Installation:

To verify that FFmpeg is installed and can be called from the command line, you can run the following command in your terminal:

```
ffmpeg -version
```

Other dependencies:

- Express
- Cors
- Fluent-ffmpeg
- Multer
- Vue
- Pinia
- TailwindCSS

## Installation

#### Clone the repository:

```
git clone https://github.com/bicicura/luna-lust-task.git
```

#### Navigate to the app directory:

```
cd luna-lust-task
```

#### Install backend dependencies:

You will find two directories. One for backend app and another one for frontend.

```
cd backend
npm install
```

#### Boot backend:

Start server on port 3000.

```
npm start
```

#### Install frontend dependencies:

Open another terminal and navigate to frontend directory.

```
cd ../frontend
npm install
```

#### Boot frontend:

Start Vue.js app on port 5173.

```
npm run dev
```

> [!NOTE]
> There is another branch which contains a frontend only solution, that uses native browser API to handle audio processing instead of FFMPEG.

import React, { useState } from 'react';
import { 
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const CreateQuizzes = () => {
  const [quiz, setQuiz] = useState({
    title: '',
    grade: 'Grade 9',
    questions: [
      {
        id: Date.now(),
        text: 'What is $\\sqrt{4}$?',
        options: [
          { id: 1, text: '2', isCorrect: true },
          { id: 2, text: '4', isCorrect: false }
        ]
      }
    ]
  });

  // KaTeX rendering functions
  const renderMath = (text) => {
    try {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(text, {
              throwOnError: false,
              displayMode: false
            })
          }}
        />
      );
    } catch (error) {
      return <span style={{ color: 'red' }}>{text}</span>;
    }
  };

  const extractAndRenderMath = (input) => {
    const matches = input.match(/\$(.*?)\$/g) || [];
    return matches.map((match, index) => (
      <React.Fragment key={index}>
        {renderMath(match.replace(/\$/g, ''))}
        {input.split(match)[1] || ''}
      </React.Fragment>
    ));
  };

  // Question management
  const addQuestion = () => {
    setQuiz(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: Date.now(),
          text: '',
          options: [
            { id: Date.now() + 1, text: '', isCorrect: false },
            { id: Date.now() + 2, text: '', isCorrect: false }
          ]
        }
      ]
    }));
  };

  const addOption = (questionId) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q => q.id === questionId ? {
        ...q,
        options: [...q.options, { id: Date.now(), text: '', isCorrect: false }]
      } : q)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quiz Data:', quiz);
    alert('Quiz structure logged to console!');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Math Quiz Creator
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Quiz Title"
          value={quiz.title}
          onChange={e => setQuiz({...quiz, title: e.target.value})}
          sx={{ mb: 3 }}
          required
        />

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Grade Level</InputLabel>
          <Select
            value={quiz.grade}
            label="Grade Level"
            onChange={e => setQuiz({...quiz, grade: e.target.value})}
          >
            {[9, 10, 11, 12].map(grade => (
              <MenuItem key={grade} value={`Grade ${grade}`}>
                Grade {grade}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {quiz.questions.map((question, qIndex) => (
          <div key={question.id} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Question {qIndex + 1}
              </Typography>
              <IconButton 
                color="error" 
                onClick={() => setQuiz(prev => ({
                  ...prev,
                  questions: prev.questions.filter(q => q.id !== question.id)
                }))}
              >
                <Delete />
              </IconButton>
            </div>

            <TextField
              fullWidth
              label="Question Text (use $...$ for math)"
              value={question.text}
              onChange={e => setQuiz(prev => ({
                ...prev,
                questions: prev.questions.map(q => 
                  q.id === question.id ? {...q, text: e.target.value} : q
                )
              }))}
              sx={{ mb: 2 }}
              required
            />
            <Typography variant="body1" sx={{ mb: 2 }}>
              Preview: {extractAndRenderMath(question.text)}
            </Typography>

            {question.options.map((option, oIndex) => (
              <div key={option.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Radio
                  checked={option.isCorrect}
                  onChange={() => setQuiz(prev => ({
                    ...prev,
                    questions: prev.questions.map(q => 
                      q.id === question.id ? {
                        ...q,
                        options: q.options.map(opt => 
                          opt.id === option.id 
                            ? {...opt, isCorrect: true} 
                            : {...opt, isCorrect: false}
                        )
                      } : q
                    )
                  }))}
                />
                <TextField
                  fullWidth
                  label={`Option ${oIndex + 1}`}
                  value={option.text}
                  onChange={e => setQuiz(prev => ({
                    ...prev,
                    questions: prev.questions.map(q => 
                      q.id === question.id ? {
                        ...q,
                        options: q.options.map(opt => 
                          opt.id === option.id ? {...opt, text: e.target.value} : opt
                        )
                      } : q
                    )
                  }))}
                  required
                />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {extractAndRenderMath(option.text)}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() => setQuiz(prev => ({
                    ...prev,
                    questions: prev.questions.map(q => 
                      q.id === question.id ? {
                        ...q,
                        options: q.options.filter(opt => opt.id !== option.id)
                      } : q
                    )
                  }))}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </div>
            ))}

            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => addOption(question.id)}
              sx={{ mt: 1 }}
            >
              Add Option
            </Button>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={addQuestion}
          >
            Add Question
          </Button>
          
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ ml: 'auto' }}
          >
            Save Quiz
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default CreateQuizzes;
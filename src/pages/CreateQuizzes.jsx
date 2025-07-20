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
import { supabase } from '../config/supabase';

const topicsData = {
  'Grade 8': {
    Whole_Numbers: ['Properties of whole numbers','Calculations using whole numbers','Calculation techniques','Multiples and factors','Solving problems'],
    Integers: ['Calculations with integers','Properties of integers',],
    Common_Fractions: ['Calculations with fractions','Calculation techniques','Percentage','Solving problems'],
    Decimal_Fractions: ['Calculations with decimal fractions','Calculation techniques','Solving problems'],
    Exponents: ['Comparing and representing numbers in exponential form','Calculations with exponents','Solving problems'],
    Numeric_and_Geometric_Patterns: ['Investigate and extend patterns'],
    Functions_and_Relationships: ['Input and output values','Equivalent forms'],
    Algebraic_Expressions: ['Algebraic language','Expand and simplify algebraic expression','Expand and simplify algebraic expressions'],
    Algebraic_Equations: ['Equations'],
    Geometry_of_Straight_Lines: ['Angle relationships','Solving problems'],
    Geometry_of_2D_Shapes: ['Classifying 2D shapes','Constructions', 'Similar and congruent 2D shapes', 'Solving problems'],
    Graphs: ['Interpreting graphs','Drawing graphs'],
    Theorem_of_Pythagoras: ['Develop and use the Theorem of Pythagoras'],
    Area_and_Perimeter_of_2D_Shapes: ['Area and perimeter','Calculations and solving problems'],
  },
  'Grade 9': {
    Algebra: ['Quadratic Equations', 'Polynomials'],
    Trigonometry: ['Basic Trig', 'Graphs'],
  },
  'Grade 10': {
    Algebra: ['Functions', 'Inequalities'],
    Geometry: ['Coordinate Geometry', 'Transformations'],
  },
  'Grade 11': {
    Calculus: ['Limits', 'Derivatives'],
    Statistics: ['Probability', 'Distributions'],
  },
  'Grade 12': {
    Calculus: ['Integrals', 'Applications'],
    Statistics: ['Regression', 'Hypothesis Testing'],
  },
};

const QUESTION_TYPES = [
  { value: 'multiple_choice', label: 'Multiple Choice' },
  { value: 'fill_in', label: 'Fill in Answer' },
  { value: 'drag_and_drop', label: 'Drag and Drop Order' },
];

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

  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [questionTypes, setQuestionTypes] = useState({ 0: 'multiple_choice' });

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
    setQuiz(prev => {
      const newId = Date.now();
      return {
      ...prev,
      questions: [
        ...prev.questions,
        {
            id: newId,
          text: '',
          options: [
              { id: newId + 1, text: '', isCorrect: false },
              { id: newId + 2, text: '', isCorrect: false }
          ]
        }
      ]
      };
    });
    setQuestionTypes(prev => ({ ...prev, [Object.keys(prev).length]: 'multiple_choice' }));
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

  const removeQuestion = (qIndex, questionId) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter((q, idx) => idx !== qIndex)
    }));
    setQuestionTypes(prev => {
      const updated = { ...prev };
      delete updated[qIndex];
      // Re-index remaining types
      const newTypes = {};
      Object.keys(updated).sort((a, b) => a - b).forEach((key, i) => {
        newTypes[i] = updated[key];
      });
      return newTypes;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Starting quiz submission...');
    console.log('Supabase client:', supabase);
    
    // Prepare quiz data
    const quizData = {
      title: quiz.title,
      grade: selectedGrade,
      topic: selectedTopic,
      subtopic: selectedSubtopic,
      questions: quiz.questions,
      created_at: new Date().toISOString(),
    };
    
    console.log('Quiz data to insert:', quizData);
    
    try {
      // Save to Supabase
      const { data, error } = await supabase.from('quizzes').insert([quizData]);
      
      console.log('Supabase response:', { data, error });
      
      if (error) {
        console.error('Supabase error details:', error);
        alert('Error saving quiz: ' + error.message + '\nCode: ' + error.code);
      } else {
        console.log('Quiz saved successfully:', data);
        alert('Quiz saved to Supabase!');
        // Optionally reset form here
      }
    } catch (catchError) {
      console.error('Caught error:', catchError);
      alert('Unexpected error: ' + catchError.message);
    }
  };

  // Add a test function to check Supabase connection
  const testSupabaseConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      
      // Try a simple query to test connection
      const { data, error } = await supabase.from('quizzes').select('count').limit(1);
      console.log('Test query result:', { data, error });
      
      if (error) {
        console.error('Connection test failed:', error);
        alert('Supabase connection test failed: ' + error.message);
      } else {
        console.log('Supabase connection successful!');
        alert('Supabase connection successful!');
      }
    } catch (err) {
      console.error('Connection test error:', err);
      alert('Connection test error: ' + err.message);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Math Quiz Creator
      </Typography>

      {/* Add a test button */}
      <Button 
        variant="outlined" 
        onClick={testSupabaseConnection}
        sx={{ mb: 2 }}
      >
        Test Supabase Connection
      </Button>

      <form onSubmit={handleSubmit}>
        {/* GRADE SELECTOR */}
        <FormControl fullWidth sx={{ mb: 3 }} required>
          <InputLabel>Grade Level</InputLabel>
          <Select
            value={selectedGrade}
            label="Grade Level"
            onChange={e => {
              setSelectedGrade(e.target.value);
              setSelectedTopic('');
              setSelectedSubtopic('');
              setQuiz(q => ({ ...q, grade: e.target.value }));
            }}
          >
            {[8, 9, 10, 11, 12].map(grade => (
              <MenuItem key={grade} value={`Grade ${grade}`}>
                Grade {grade}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* TOPIC SELECTOR */}
        {selectedGrade && (
          <FormControl fullWidth sx={{ mb: 3 }} required>
            <InputLabel>Topic</InputLabel>
            <Select
              value={selectedTopic}
              label="Topic"
              onChange={e => {
                setSelectedTopic(e.target.value);
                setSelectedSubtopic('');
              }}
            >
              {Object.keys(topicsData[selectedGrade] || {}).map(topic => (
                <MenuItem key={topic} value={topic}>{topic}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* SUBTOPIC SELECTOR */}
        {selectedGrade && selectedTopic && (
          <FormControl fullWidth sx={{ mb: 3 }} required>
            <InputLabel>Subtopic</InputLabel>
            <Select
              value={selectedSubtopic}
              label="Subtopic"
              onChange={e => setSelectedSubtopic(e.target.value)}
            >
              {(topicsData[selectedGrade]?.[selectedTopic] || []).map(subtopic => (
                <MenuItem key={subtopic} value={subtopic}>{subtopic}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* REST OF THE FORM: Only show after subtopic is selected */}
        {selectedGrade && selectedTopic && selectedSubtopic && (
          <>
            <TextField
              fullWidth
              label="Quiz Title"
              value={quiz.title}
              onChange={e => setQuiz({...quiz, title: e.target.value})}
              sx={{ mb: 3 }}
              required
            />

            {/* Optionally show the selected topic/subtopic for clarity */}
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              <b>Grade:</b> {selectedGrade} &nbsp; <b>Topic:</b> {selectedTopic} &nbsp; <b>Subtopic:</b> {selectedSubtopic}
            </Typography>

        {quiz.questions.map((question, qIndex) => (
          <div key={question.id} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Question {qIndex + 1}
              </Typography>
              <IconButton 
                color="error" 
                    onClick={() => removeQuestion(qIndex, question.id)}
                    disabled={quiz.questions.length === 1}
              >
                <Delete />
              </IconButton>
            </div>

                {/* For every question, show type selector */}
                <FormControl fullWidth sx={{ mb: 2 }} required>
                  <InputLabel>Question Type</InputLabel>
                  <Select
                    value={questionTypes[qIndex] || 'multiple_choice'}
                    label="Question Type"
                    onChange={e => {
                      setQuestionTypes(prev => ({ ...prev, [qIndex]: e.target.value }));
                      setQuiz(prev => ({
                        ...prev,
                        questions: prev.questions.map((q, idx) =>
                          idx === qIndex
                            ? e.target.value === 'fill_in'
                              ? { ...q, options: [], answer: '' }
                              : { ...q, options: [
                                  { id: Date.now() + 1, text: '', isCorrect: false },
                                  { id: Date.now() + 2, text: '', isCorrect: false }
                                ], answer: undefined }
                            : q
                        )
                      }));
                    }}
                  >
                    {QUESTION_TYPES.map(type => (
                      <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Render fields based on type */}
                {questionTypes[qIndex] === 'drag_and_drop' ? (
                  <>
                    <TextField
                      fullWidth
                      label="Question Text (use $...$ for math)"
                      value={question.text}
                      onChange={e => setQuiz(prev => ({
                        ...prev,
                        questions: prev.questions.map((q, idx) => 
                          idx === qIndex ? { ...q, text: e.target.value } : q
                        )
                      }))}
                      sx={{ mb: 2 }}
                      required
                    />
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Preview: {extractAndRenderMath(question.text)}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Enter the items in the correct order:
                    </Typography>
                    {(question.orderItems || ['']).map((item, itemIdx) => (
                      <div key={itemIdx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <TextField
                          fullWidth
                          label={`Item ${itemIdx + 1}`}
                          value={item}
                          onChange={e => setQuiz(prev => ({
                            ...prev,
                            questions: prev.questions.map((q, idx) =>
                              idx === qIndex ? {
                                ...q,
                                orderItems: (q.orderItems || []).map((it, i) => i === itemIdx ? e.target.value : it)
                              } : q
                            )
                          }))}
                          required
                        />
                        <IconButton
                          color="error"
                          onClick={() => setQuiz(prev => ({
                            ...prev,
                            questions: prev.questions.map((q, idx) =>
                              idx === qIndex ? {
                                ...q,
                                orderItems: (q.orderItems || []).filter((_, i) => i !== itemIdx)
                              } : q
                            )
                          }))}
                          disabled={(question.orderItems || []).length <= 1}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </div>
                    ))}
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={() => setQuiz(prev => ({
                        ...prev,
                        questions: prev.questions.map((q, idx) =>
                          idx === qIndex ? {
                            ...q,
                            orderItems: [...(q.orderItems || ['']), '']
                          } : q
                        )
                      }))}
                      sx={{ mt: 1 }}
                    >
                      Add Item
                    </Button>
                  </>
                ) : questionTypes[qIndex] === 'fill_in' ? (
                  <>
                    <TextField
                      fullWidth
                      label="Question Text (use $...$ for math)"
                      value={question.text}
                      onChange={e => setQuiz(prev => ({
                        ...prev,
                        questions: prev.questions.map((q, idx) => 
                          idx === qIndex ? { ...q, text: e.target.value } : q
                        )
                      }))}
                      sx={{ mb: 2 }}
                      required
                    />
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Preview: {extractAndRenderMath(question.text)}
                    </Typography>
                    <TextField
                      fullWidth
                      label="Correct Answer"
                      value={question.answer || ''}
                      onChange={e => setQuiz(prev => ({
                        ...prev,
                        questions: prev.questions.map((q, idx) =>
                          idx === qIndex ? { ...q, answer: e.target.value } : q
                        )
                      }))}
                      sx={{ mb: 2 }}
                      required
                    />
                  </>
                ) : (
                  <>
            <TextField
              fullWidth
              label="Question Text (use $...$ for math)"
              value={question.text}
              onChange={e => setQuiz(prev => ({
                ...prev,
                        questions: prev.questions.map((q, idx) => 
                          idx === qIndex ? { ...q, text: e.target.value } : q
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
                            questions: prev.questions.map((q, idx) => 
                              idx === qIndex ? {
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
                            questions: prev.questions.map((q, idx) => 
                              idx === qIndex ? {
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
                            questions: prev.questions.map((q, idx) => 
                              idx === qIndex ? {
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
                  </>
                )}
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
          </>
        )}
      </form>
    </Paper>
  );
};

export default CreateQuizzes;
import React, { useState } from 'react';
import { FaDumbbell, FaFire, FaClock, FaPlus, FaTrash } from 'react-icons/fa';

const WorkoutManagement = () => {
    // Mock data for workouts
    const [workouts, setWorkouts] = useState([
        {
            id: 1,
            title: 'Full Body Burn',
            description: 'A high-intensity workout targeting all muscle groups.',
            difficulty: 'medium',
            exercises: [
                {
                    id: 1,
                    name: 'Push-ups',
                    sets: 3,
                    reps: 15,
                    difficulty: 'easy',
                    description: 'Great for chest and triceps.'
                },
                {
                    id: 2,
                    name: 'Squats',
                    sets: 4,
                    reps: 12,
                    difficulty: 'medium',
                    description: 'Targets legs and glutes.'
                }
            ]
        },
        {
            id: 2,
            title: 'Core Blast',
            description: 'Focus on strengthening your core muscles.',
            difficulty: 'hard',
            exercises: [
                {
                    id: 3,
                    name: 'Plank',
                    sets: 3,
                    reps: 60, // Reps represent seconds for isometric exercises
                    difficulty: 'medium',
                    description: 'Hold for 60 seconds per set.'
                }
            ]
        }
    ]);

    // State for creating a new workout
    const [newWorkout, setNewWorkout] = useState({
        title: '',
        description: '',
        difficulty: 'medium',
        exercises: []
    });

    // State for adding a new exercise
    const [newExercise, setNewExercise] = useState({
        name: '',
        sets: 1,
        reps: 10,
        difficulty: 'easy',
        description: ''
    });

    // Add a new workout
    const handleAddWorkout = (e) => {
        e.preventDefault();
        if (!newWorkout.title || !newWorkout.description) return;

        const workout = {
            id: Date.now(),
            ...newWorkout
        };

        setWorkouts([...workouts, workout]);
        setNewWorkout({
            title: '',
            description: '',
            difficulty: 'medium',
            exercises: []
        });
    };

    // Add a new exercise to the current workout
    const handleAddExercise = (e) => {
        e.preventDefault();
        if (!newExercise.name || !newExercise.description) return;

        const exercise = {
            id: Date.now(),
            ...newExercise
        };

        setNewWorkout({
            ...newWorkout,
            exercises: [...newWorkout.exercises, exercise]
        });

        setNewExercise({
            name: '',
            sets: 1,
            reps: 10,
            difficulty: 'easy',
            description: ''
        });
    };

    // Delete an exercise from a workout
    const handleDeleteExercise = (workoutId, exerciseId) => {
        setWorkouts(workouts.map(workout =>
            workout.id === workoutId
                ? {
                    ...workout,
                    exercises: workout.exercises.filter(ex => ex.id !== exerciseId)
                }
                : workout
        ));
    };

    // Inline styles for a cohesive design
    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
            color: '#fff',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        },
        header: {
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '2rem',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            background: 'linear-gradient(45deg, #00b4d8, #90e0ef)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        },
        creationForm: {
            background: 'rgba(255,255,255,0.05)',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '3rem',
            backdropFilter: 'blur(10px)'
        },
        input: {
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '8px',
            marginBottom: '1rem',
            width: '100%',
            fontSize: '1rem',
            transition: 'all 0.3s ease'
        },
        button: {
            background: 'linear-gradient(45deg, #00b4d8, #90e0ef)',
            color: '#fff',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '1rem'
        },
        workoutCard: {
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            border: '1px solid rgba(255,255,255,0.1)'
        },
        difficultyBadge: {
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '700',
            textTransform: 'uppercase'
        },
        exerciseCard: {
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem'
        },
        deleteButton: {
            background: '#e74c3c',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            transition: 'opacity 0.3s ease'
        }
    };

    const difficultyColors = {
        easy: { background: 'rgba(46, 213, 115, 0.2)', color: '#2ed573' },
        medium: { background: 'rgba(241, 196, 15, 0.2)', color: '#f1c40f' },
        hard: { background: 'rgba(231, 76, 60, 0.2)', color: '#e74c3c' }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}><FaDumbbell /> Workout Management</h1>

            {/* Workout Creation Form */}
            <div style={styles.creationForm}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Create New Workout</h2>
                <form onSubmit={handleAddWorkout}>
                    <input
                        type="text"
                        placeholder="Workout Title"
                        value={newWorkout.title}
                        onChange={(e) => setNewWorkout({ ...newWorkout, title: e.target.value })}
                        required
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Description"
                        value={newWorkout.description}
                        onChange={(e) => setNewWorkout({ ...newWorkout, description: e.target.value })}
                        required
                        style={{ ...styles.input, minHeight: '100px' }}
                    />
                    <select
                        value={newWorkout.difficulty}
                        onChange={(e) => setNewWorkout({ ...newWorkout, difficulty: e.target.value })}
                        style={styles.input}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <button type="submit" style={styles.button}>
                        <FaPlus /> Create Workout
                    </button>
                </form>
            </div>

            {/* Exercise Addition Form */}
            <div style={styles.creationForm}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Add Exercise to Workout</h2>
                <form onSubmit={handleAddExercise}>
                    <input
                        type="text"
                        placeholder="Exercise Name"
                        value={newExercise.name}
                        onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                        required
                        style={styles.input}
                    />
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <input
                            type="number"
                            placeholder="Sets"
                            value={newExercise.sets}
                            onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                            required
                            style={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Reps"
                            value={newExercise.reps}
                            onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                            required
                            style={styles.input}
                        />
                        <select
                            value={newExercise.difficulty}
                            onChange={(e) => setNewExercise({ ...newExercise, difficulty: e.target.value })}
                            style={styles.input}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <textarea
                        placeholder="Exercise Description"
                        value={newExercise.description}
                        onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                        required
                        style={{ ...styles.input, minHeight: '100px' }}
                    />
                    <button type="submit" style={styles.button}>
                        <FaPlus /> Add Exercise
                    </button>
                </form>
            </div>

            {/* Workout List */}
            <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Your Workouts</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {workouts.map(workout => (
                        <div key={workout.id} style={styles.workoutCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{workout.title}</h3>
                                <span style={{
                                    ...styles.difficultyBadge,
                                    ...difficultyColors[workout.difficulty]
                                }}>
                                    {workout.difficulty}
                                </span>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>{workout.description}</p>
                            <div>
                                <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Exercises:</h4>
                                {workout.exercises.map(exercise => (
                                    <div key={exercise.id} style={styles.exerciseCard}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>{exercise.name}</h5>
                                            <button
                                                style={styles.deleteButton}
                                                onClick={() => handleDeleteExercise(workout.id, exercise.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>{exercise.description}</p>
                                        <div style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.7)' }}>
                                            <span>Sets: {exercise.sets}</span>
                                            <span>Reps: {exercise.reps}</span>
                                            <span style={{
                                                ...styles.difficultyBadge,
                                                ...difficultyColors[exercise.difficulty]
                                            }}>
                                                {exercise.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkoutManagement;
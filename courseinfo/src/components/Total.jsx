const Total = ({ course }) => {
    const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0)
    return (
        <p><strong>total of {totalExercises} exercises</strong></p>
    )
}

export default Total
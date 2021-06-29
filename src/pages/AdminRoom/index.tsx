import { useParams, useHistory } from 'react-router-dom'
import { Button } from '../../Components/Button/index'
import { Question } from '../../Components/Question/index'
import { RoomCode } from '../../Components/RoomCode/index'
// import { useAuth } from '../../hooks/useAuth'
import { useRoom } from '../../hooks/useRoom'
import { database } from '../../services/firebase'

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import answerImg from '../../assets/images/answer.svg'
import checkImg from '../../assets/images/check.svg'

import '../Room/room.scss'
import './admin-room.scss'

type RoomParams = {
    id: string
}

export function AdminRoom() {
    // const { user } = useAuth()
    const params = useParams<RoomParams>()
    const roomId = params.id

    const { questions, title } = useRoom(roomId)
    const history = useHistory()

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
    }

    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                    <RoomCode code={roomId} />
                    <Button isOutlined onClick={() => handleEndRoom()} >Fechar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length == 1 ? 
                    <span>{questions.length} pergunta</span>
                    :
                    <span>{questions.length} perguntas</span>}
                </div>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                                >
                                    { !question.isAnswered && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                            >
                                                <img src={checkImg} alt="Marcar pergunta como respondida" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleHighlightQuestion(question.id)}
                                            >
                                                <img src={answerImg} alt="Dar destaque à pergunta" />
                                            </button>
                                        </>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                        <img src={deleteImg} alt="deletar imagem" />
                                    </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
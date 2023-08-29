/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react';
import { Button, Form, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Icon } from '../../components';
import { useData } from '../../contexts/data-context/context';
import { Game, GameListItem } from '../../models/game';
import { Layout } from '../layout';

const GameRow: React.FC<{ game: GameListItem }> = ({ game }) => {
    const { deleteGame, updateGame } = useData();
    const [name, setName] = useState(game.name);
    const [description, setDescription] = useState(game.description ?? '');

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
            updateGame(game._id, { name: e.target.value });
        },
        [name, description],
    );

    const onChangeDescription = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value);
            updateGame(game._id, { description: e.target.value });
        },
        [name, description],
    );

    const onDeleteGame = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        deleteGame(String(game._id));
    }, []);

    return (
        <div className="mb:36">
            <div className="d:flex gap:12px mb:12">
                <Form.Control
                    value={game._id}
                    style={{ width: '20%', maxWidth: 30, minWidth: 20 }}
                    readOnly
                    plaintext
                />
                <Form.Control value={name} onChange={onChangeName} />
                <Button variant="danger" onClick={onDeleteGame}>
                    <Icon icon="trash" />
                </Button>
            </div>
            <div>
                <Form.Control
                    as="textarea"
                    value={description}
                    onChange={onChangeDescription}
                />
            </div>
        </div>
    );
};

export const PageHome: React.FC = () => {
    const { games, deleteGame, fetchGames } = useData();

    const onDeleteGame = async (gameId: string) => {
        if (confirm(`Delete game ${gameId}?`)) {
            await deleteGame(gameId);
        }
    };

    return (
        <Layout title="Games" loading={games.loading}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Cards count</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {games.data.map((game) => (
                        <tr key={game._id}>
                            <td>{game._id}</td>
                            <td>{game.name}</td>
                            <td>{game.cardsCount}</td>
                            <td className="d:flex gap:12 justify-content:end">
                                <Link to={`/game/${game._id}`}>
                                    <Button size="sm">
                                        <Icon icon="pen" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDeleteGame(game._id)}
                                >
                                    <Icon icon="trash" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="bottom d:flex justify-content:space-between align-items:center">
                <p className="f:0.8em m:0">
                    <b>Updated on : </b>
                    <span>{games.updatedOn.toISOString()}</span>
                </p>
                <div className="d:flex gap:12">
                    <Button size="sm" onClick={fetchGames}>
                        Refresh
                    </Button>
                    <Link to="/new">
                        <Button size="sm">
                            <Icon icon="plus" className="mr:6" />
                            Create game
                        </Button>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

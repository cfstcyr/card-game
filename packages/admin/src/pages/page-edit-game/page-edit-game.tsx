import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useData } from '../../contexts/data-context/context';
import { Game } from '../../models/game';
import { Layout } from '../layout';

export const PageEditGame: React.FC = () => {
    const { id } = useParams();
    const { games, cards, updateGame, fetchCards } = useData();
    const [game, setGame] = useState<Game>();
    const [name, setName] = useState(game?.name);
    const [description, setDescription] = useState(game?.description);
    const [cardsChanged, setCardChanged] = useState(false);
    const [cardsValue, setCardsValue] = useState<string>('');

    useEffect(() => {
        if (id) {
            const game = games.data.find((g) => g.id === Number(id));
            if (game) {
                setGame(game);
                fetchCards(id);
            }
        }
    }, [id, games]);

    useEffect(() => {
        if (game) {
            setName(game.name);
            setDescription(game.description);
        }
    }, [game]);

    useEffect(() => {
        setCardsValue(
            cards[Number(id)]?.data.map(({ content }) => content).join('\n') ??
                '',
        );
    }, [cards]);

    const onChangeName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!game) return;
            setName(e.target.value);
        },
        [game],
    );

    const onChangeDescription = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!game) return;
            setDescription(e.target.value);
        },
        [game],
    );

    const onChangeCards = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setCardChanged(true);
            console.log(e.target.value);
            setCardsValue(e.target.value);
        },
        [],
    );

    const hasChanged = useCallback(() => {
        return (
            cardsChanged ||
            game?.name !== name ||
            game?.description !== description
        );
    }, [cardsChanged, game, name, description]);

    const onSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            if (!game) return;

            updateGame(game.id, {
                name,
                description,
                cards: cardsChanged
                    ? cardsValue?.split('\n').filter((l) => l.trim().length > 0)
                    : undefined,
            });
        },
        [game, name, description, cardsValue],
    );

    return game ? (
        <Layout title={game.name} loading={games.loading} back="/">
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb:12">
                    <Form.Label>ID</Form.Label>
                    <Form.Control value={game.id} readOnly />
                </Form.Group>

                <Form.Group className="mb:12">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} onChange={onChangeName} />
                </Form.Group>

                <Form.Group className="mb:12">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={onChangeDescription}
                    />
                </Form.Group>

                <hr />

                <Form.Control
                    as="textarea"
                    className="mb:12"
                    style={{ minHeight: 300 }}
                    onChange={onChangeCards}
                    value={cardsValue}
                    disabled={cardsValue === undefined}
                />

                <div className="d:flex justify-content:space-between">
                    <p className="f:0.8em opacity:0.55">
                        <b>Saved : </b>
                        {games.updatedOn.toISOString()}
                    </p>
                    <Button type="submit" disabled={!hasChanged()}>
                        Update game
                    </Button>
                </div>
            </Form>
        </Layout>
    ) : (
        <Layout title="Game" loading></Layout>
    );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/data-context/context';
import { Layout } from '../layout';

export const PageCreateGame: React.FC = () => {
    const { createGame } = useData();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const name = (e.target as any).name.value;
        const description = (e.target as any).description.value;
        const mode = (e.target as any).mode.value;
        const nsfw = (e.target as any).nsfw.value === 'on' ? true : false;
        (e.target as any).reset();

        await createGame({ name, description, mode, nsfw, cards: [] });

        setLoading(false);
        navigate('/');
    }, []);

    return (
        <Layout title="Create game" loading={loading} back="/">
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb:12">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" required />
                </Form.Group>
                <Form.Group className="mb:12">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" as="textarea" />
                </Form.Group>
                <Form.Group className="mb:12">
                    <Form.Label>Mode</Form.Label>
                    <Form.Select name="mode">
                        <option value="default">Default</option>
                        <option value="vs">VS</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb:12">
                    <Form.Check type="checkbox" label="NSFW" name="nsfw" />
                </Form.Group>
                <div className="d:flex justify-content:end">
                    <Button type="submit" disabled={loading}>
                        Create
                    </Button>
                </div>
            </Form>
        </Layout>
    );
};

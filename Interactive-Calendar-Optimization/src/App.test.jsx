import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Interactive Calendar", () => {

    test("renders calendar heading", () => {

        render(<App />);

        expect(
            screen.getByText("Interactive Calendar")
        ).toBeInTheDocument();

    });

    test("displays initial events", () => {

        render(<App />);

        expect(
            screen.getByText("Instagram Post")
        ).toBeInTheDocument();

        expect(
            screen.getByText("LinkedIn Article")
        ).toBeInTheDocument();

    });

    test("adds a new event", async () => {

        const user = userEvent.setup();

        render(<App />);

        const button = screen.getByText("Add Event");

        await user.click(button);

        expect(
            screen.getByText("New Event")
        ).toBeInTheDocument();

    });

    test("selects an event", async () => {

        const user = userEvent.setup();

        render(<App />);

        await user.click(
            screen.getByText("Instagram Post")
        );

        expect(
            screen.getByText("Selected Event")
        ).toBeInTheDocument();

    });

});
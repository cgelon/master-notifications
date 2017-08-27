import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";
import Notification from "../src/ts/Notification";
import jQuery = require("jquery");
import $ = require("jquery");

@suite(timeout(3000), slow(1000))
class TestNotification {
    @test("Test standard Notification constructor") public TestConstructor(): void {
        const message: string = "this is a message";
        const notification: Notification = new Notification(message, "success", {});
        expect(notification.message).to.equal(message);
    }
    
    /**
     * A method to allow for JavaScript threads to sleep using await.
     * @param timeInMilliseconds The amount of time to sleep, in milliseconds.
     */
    private sleep(timeInMilliseconds: number): Promise<void> {
        return new Promise<void>(resolve => setTimeout(resolve, timeInMilliseconds));
    }
}
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";
import Notification from "../src/ts/Notification";

@suite(timeout(2000), slow(500))
class TestNotification {
    @test("Test standard Notification constructor") public testConstructor(): void {
        const message: string = "this is a message";
        const notification: Notification = new Notification(message, "success", {});
        expect(notification.id).not.equal(0);
        expect(notification.message).to.equal(message);
        expect(notification.type).to.equal("success");
    }
}
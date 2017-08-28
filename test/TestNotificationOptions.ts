import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";
import Notification from "../src/ts/Notification";
import Utilities from "./Utilities";

@suite(timeout(3000))
class TestNotificationOptions {
    @test("Test if the showCloseButton option is correctly working") public testShowCloseButton(): void {
        const notificationWithoutButton: Notification = new Notification("doesn't matter", "success", { showCloseButton: false });
        expect(notificationWithoutButton.$container.find(".masternotifications-notification-close-button")).to.have.lengthOf(0);
        const notificationWithButton: Notification = new Notification("doesn't matter", "success", { showCloseButton: true });
        expect(notificationWithButton.$container.find(".masternotifications-notification-close-button")).to.have.lengthOf(1);
    }

    // TODO (chgelon 8/27/17): Figure out how to load styles into JSDOM to allow for testing of animations.
    /*@test("Test if the showTimeInSeconds option is correctly working")*/ public async testShowTime(): Promise<void> {
        const foreverNotification: Notification = new Notification("forever", "success", { showTimeInSeconds: 0 });
        const quickNotification: Notification = new Notification("quick", "success", { showTimeInSeconds: 0.1 });
        const longerNotification: Notification = new Notification("long", "success", { showTimeInSeconds: 1.0 });
        $(document.documentElement).append(foreverNotification.$container).append(quickNotification.$container).append(longerNotification.$container);
        foreverNotification.start();
        quickNotification.start();
        longerNotification.start();
        await Utilities.sleep(1000);
        expect($.contains(document.documentElement, foreverNotification.$container[0]), "ForeverNotification should be still there after one second").to.be.true;
        expect($.contains(document.documentElement, quickNotification.$container[0]), "QuickNotifiction should not be there after one second").to.be.false;
        expect($.contains(document.documentElement, longerNotification.$container[0]), "LongerNotification should be still there after one second").to.be.true;
        await Utilities.sleep(1000);
        expect($.contains(document.documentElement, foreverNotification.$container[0]), "ForeverNotification should be still there after two seconds").to.be.true;
        expect($.contains(document.documentElement, quickNotification.$container[0]), "QuickNotifiction should not be there after two seconds").to.be.false;
        expect($.contains(document.documentElement, longerNotification.$container[0]), "LongerNotification should not be there after two seconds").to.be.false;
    }
    
    
}
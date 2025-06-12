import { Routes } from "@angular/router";
import { LoginComponent } from "./routes/loginComponent";
import { ChatComponent } from "./routes/chatComponent";
import { LogoutComponent } from "./routes/logoutComponent";
import { SignUpComponent } from "./routes/signUpComponent";
import { authGuard } from "./auth-guard";

export const routes: Routes = [
	{ path: "", redirectTo: "login", pathMatch: "full" },
	{ path: "login", component: LoginComponent },
	{ path: "chat", component: ChatComponent, canActivate: [authGuard] },
	{ path: "signup", component: SignUpComponent },
	{ path: "logout", component: LogoutComponent },
	{ path: "**", redirectTo: "login" },
];

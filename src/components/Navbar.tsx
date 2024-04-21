"use client";

import React from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { ModeToggle } from "./theme/Theme-Toggle";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Img from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function Navbar() {
  const path = usePathname();
  const { data: session, status } = useSession();

  if (path.startsWith("/dashboard") || path === "/onboarding") return <></>;

  return (
    <div className="flex w-full items-center justify-around p-2 shadow-md dark:border-b-2 dark:border-foreground">
      <Link
        href="/"
        className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-2xl font-bold text-transparent"
      >
        Brilliant++
      </Link>
      <div className="flex gap-2 divide-x-2">
        <div className="px-2">
          <NavigationMenu>
            <NavigationMenuList>
              {/* <NavigationMenuItem> */}
              {/* <NavigationMenuTrigger>Getting started</NavigationMenuTrigger> */}
              {/* <NavigationMenuContent> */}
              {/* <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"> */}
              {/* <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components that you can copy
                            and paste into your apps. Accessible. Customizable.
                            Open Source.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li> */}
              {/* <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Typography"
                    >
                      Styles for headings, paragraphs, lists...etc
                    </ListItem> */}
              {/* </ul> */}
              {/* </NavigationMenuContent> */}
              {/* </NavigationMenuItem> */}
              {/* <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem> */}
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-2 pl-2">
          <ModeToggle />
          {status === "authenticated" ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Img
                    src={
                      session?.user?.image ?? "https://via.placeholder.com/150"
                    }
                    alt="User profile picture"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    My Account | {session.user.role}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <Link href="profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link href="profile">
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/api/auth/signin" passHref>
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

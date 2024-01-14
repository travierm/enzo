# Enzo
Server side app framework running on bun with HTMX

### Tech Stack
- [Hono](https://hono.dev) for routing
- [Preact](https://preactjs.com/guide/v10/server-side-rendering/) as a JSX templating engine
- [HTMX](https://htmx.org/) for frontend interactivity
- [Tailwind](https://tailwindcss.com/docs/utility-first) for styling
- [Kysely](https://kysely.dev/docs/getting-started) for Migrations and data layer
- [Zod](https://zod.dev/) for form validation
- Running on [Bun](https://bun.sh/)

### How to use

Clone repo
```bash
git clone https://github.com/travierm/enzo.git enzo
```

Install deps:
```bash
cd enzo/ && bun install
```

Clone .env.example
```bash
cp ./.env.example .env
```

To development server on localhost:3000:
```bash
bun dev
```

## Example Code

```ts
// file: pages/Dashboard.router.tsx

app.post("/dashboard/expense", async (c) => {
  const result = await validateForm(
    c,
    z.object({
      name: z.string(),
      amount: z.string(),
    })
  );

  if (result.success) {
    const { name, amount } = result.data;

    await createRecord({
      name,
      amount: Number(amount),
      type: "expense",
    });
  }

  return getDashboard(c);
});
```


```tsx
// file: pages/Dashboard.controller.tsx

export async function getDashboard(c: Context) {
  const expenses = transformRecords(await getRecordsByType("expense"));
  const income = transformRecords(await getRecordsByType("income"));
  const currentBalance = await getCurrentBalance();

  return render(
    c,
    <Dashboard
      currentBalance={currentBalance}
      income={income}
      expenses={expenses}
    />
  );
}
```


```tsx
// file: pages/Dashboard.tsx

type Props = {
  alertMessage?: AlertMessage;
  income: TransformedRecord[];
  expenses: TransformedRecord[];
  currentBalance: number;
};

export function Dashboard(props: Props) {
  return (
    <Layout id="dashboard-root">
      <div class="flex items-center">
        <CoreHeading size="2xl">Dashboard</CoreHeading>
      </div>

      <div class="grid grid-cols-4 gap-4 mx-4">
        <div>
          <ExpensesTable expenses={props.expenses} />
        </div>

        <div>
          <IncomeTable income={props.income} />
        </div>

        <div>
          <AccountBalance currentBalance={props.currentBalance} />
          <Stats
            currentBalance={props.currentBalance}
            income={props.income}
            expenses={props.expenses}
          />
        </div>
      </div>
    </Layout>
  );
}

```

### Cavets

You must fully write out tailwind classes in order for Tailwind to pick them up on scan
```ts
// this works
export function Example() {
  const colorMap = {
    info: "bg-blue-600",
  };

  const color = colorMap["info"];

  return <div class={`${color}`}></div>
}

// this will fail to have classes generated for it
const color = 'blue';
return <div class={`bg-${color}-500`}> 
```
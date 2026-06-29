This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.jsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Panel Zarządzania Stroną - Mycie Bruku i Elewacji

Ta strona została zaprojektowana tak, aby jej edycja była maksymalnie prosta.
**Nie musisz znać się na programowaniu, aby zmienić ceny, dodać zdjęcia czy nowe produkty.**

Wszystkie informacje na stronie znajdują się w **jednym pliku**.
Ten plik to: `data/content.js`. Otwórz go w dowolnym edytorze tekstu.

---

## 📝 Jak edytować stronę?

### 1. Zmiana numeru telefonu lub e-maila
Na samej górze pliku znajdziesz sekcję `export const firma`. Po prostu podmień tekst w cudzysłowach:
```javascript```
export const firma = {
  nazwa: "Nowa Nazwa Firmy",
  telefon: "+48 111 222 333", // Zmień numer tutaj
  email: "nowy@email.pl",
  // ...
};
---

### Krok 4: Deployment (Publikacja w Internecie)

Skoro kod korzysta z Next.js, najprostszym, darmowym i najszybszym sposobem na wrzucenie tej strony do sieci (tak aby wujek miał do niej link) jest platforma **Vercel** (twórcy Next.js).

Masz na to dwa szybkie sposoby, skoro pracujesz na WSL z repozytorium (masz folder `.git`):

**Opcja A (Zalecana, pełen automat):**
1. Wypchnij (push) projekt na swojego GitHuba (jako prywatne lub publiczne repo).
2. Zaloguj się na [vercel.com](https://vercel.com/) kontem GitHub.
3. Kliknij "Add New" -> "Project" -> Zaimportuj repozytorium ze stroną wujka.
4. Kliknij `Deploy`. Vercel sam rozpozna, że to Next.js i zbuduje stronę. Przy każdym kolejnym `git push` strona zaktualizuje się automatycznie.

**Opcja B (Z terminala WebStorm / WSL):**
1. W terminalu wpisz: `npx vercel`
2. Zaloguj się (przekieruje Cię do przeglądarki).
3. Odpowiadaj `Enterem` na domyślne pytania w terminalu (czy podpiąć projekt, w jakim jest folderze itp.). Narzędzie samo wrzuci stronę na serwer i wygeneruje Ci gotowy link.

### Podsumowanie
Gratulacje! Stworzyłeś dla wujka kompletną, ultraszybką, bezpieczną od awarii i banaln
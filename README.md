# Frontend Eindopdracht Liquid Library

<img src="./src/assets/images/liquid%20library%20gradient%20logo.png" width=300px alt="Liquid Library logo">

## Inleiding

Zin in een cocktail of mocktail, maar geen zin om de deur uit te gaan? Of heb je binnenkort een feestje en wil je indruk
maken op je vrienden en familie met een lekker drankje waar zelfs Barman Victor trots op zou zijn? Liquid Library is een
webapplicatie waarin je door cocktailrecepten kunt bladeren, deze kunt opslaan en een recensie en rating kunt
achterlaten bij jouw favoriete cocktails. Met behulp van verschillende filters kun je het cocktailrecept vinden dat
precies aansluit bij wat jij zoekt.

<img src="./src/assets/images/screenshot%20homepage.PNG" alt="Screenshot homepage">

## Inhoudsopgave

1. [Benodigdheden](#Benodigdheden)
2. [Installatie](#Installatie)
3. [Registratie en Inloggen](#Registratie-en-Inloggen)
4. [Beschikbare npm commando's](#Beschikbare-npm-commandos)

## Benodigdheden

Om de applicatie te kunnen runnen heb je de volgende dingen nodig:

* **WebStorm**
* **Node.js** en npm
* [De link naar de **Github Repository**](https://github.com/maritoldenburger/frontend-eindopdracht-liquid-library)

Omdat de TheCocktailDB API een publieke, gratis test-API-key aanbiedt voor educatief gebruik, is er *geen* API-key
nodig.

Andere gebruikte dependencies zijn:

* Axios
* React Router Dom
* React Hook Form
* JWT Decode
* [Font Awesome](https://fontawesome.com/)
* [React Rating](https://github.com/smastrom/react-rating?tab=readme-ov-file)

## Installatie

1. **Clone de repository**
    1. Open **WebStorm**.
    2. Ga naar **File** > **New** > **Project from Version Control...**
    3. Selecteer **Git** als versiebeheer en plak de volgende SSH-link achter **URL**:
    ```
    git@github.com:maritoldenburger/frontend-eindopdracht-liquid-library.git
    ```
    4. Wijzig eventueel de **directory**
    5. Klik op **clone**


2. **Installeer de benodigde dependencies**
    1. Als het clonen is gelukt, installeer je eerst de `node_modules` door het volgende commando in de terminal te
       runnen:

      ```shell
      npm install
      ```

3. **Start de applicatie**
    1. Als dat is gelukt, kun je de applicatie starten door het volgende commando in de terminal te runnen:
   ```shell
   npm run dev
   ```
   Je kunt ook op de groene `Run 'npm dev'` knop klikken of `Shift+F10` gebruiken.
    2. Open vervolgens http://localhost:5173 om de pagina in de browser te bekijken.

## Registratie en Inloggen

Voor het registreren en inloggen wordt er gebruik gemaakt van de NOVI Educational Backend. Voor het registreren zijn een
username, email en wachtwoord vereist. Er zijn nog geen bestaande users.

## Beschikbare npm commando's

```shell
   npm run dev
 ```
Dit commando start de ontwikkelserver op http://localhost:5173. Bij elke wijziging vindt er een live reload plaats.

```shell
   npm run build
```

Dit zet het project om naar een productiebuild.

```shell
   npm run preview
```

Er wordt een preview gegeven van de productiebuild.




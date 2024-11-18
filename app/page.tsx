import db from "@/helpers/db";
// import Link from "next/link";
import Button from "@/components/layout/ui/Button";
import { revalidatePath } from "next/cache";

export default async function Home() {
  // const chunkers = [
  //   {
  //     osrs_username: "Ardychunky",
  //     starting_chunk: "Ardougne Market",
  //     yt_channel_name: "Inoox",
  //     yt_channel_link: "https://www.youtube.com/@inoox",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Ardylock",
  //     starting_chunk: "Ardougne Market",
  //     yt_channel_name: "PiatsaThunderhorn",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Boucr",
  //     starting_chunk: "West Falador",
  //     yt_channel_name: "Boucr",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "ChunkDwarf",
  //     starting_chunk: "Keldagrim",
  //     yt_channel_name: "ChunkDwarf",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "ChunkedBolin",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "BolinBear",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Chunklyfe",
  //     starting_chunk: "Varrock Square",
  //     yt_channel_name: "Crad Bhambers",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Chunkus Lad",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "SlayBrother",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Chunky Nadz",
  //     starting_chunk: "Fortis West Bank",
  //     yt_channel_name: "Nadz OsRs",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "DrPepper700",
  //     starting_chunk: "Catherby",
  //     yt_channel_name: "CozyBoy001",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Entrana Bro",
  //     starting_chunk: "Entrana",
  //     yt_channel_name: "Entrana Bro",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Floki Odin",
  //     starting_chunk: "Land's End",
  //     yt_channel_name: "ChunkOdin",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Ideal OCM",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "SourceChunk",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "LikeEmChunky",
  //     starting_chunk: "Ardougne Market",
  //     yt_channel_name: "Casual Chunk Man",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Port Chunk",
  //     starting_chunk: "Port Sarim",
  //     yt_channel_name: "OmzigRS",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "RNGchunk",
  //     starting_chunk: "Grand Exchange",
  //     yt_channel_name: "RNGchunk",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Seeriously",
  //     starting_chunk: "Seers",
  //     yt_channel_name: "SovereignGamingNation",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Sun Chunks",
  //     starting_chunk: "Sunset Coast",
  //     yt_channel_name: "DripQuest YT",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "TreyTaverley",
  //     starting_chunk: "Taverley",
  //     yt_channel_name: "TheFlyingPen",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "UIM ChunkeZ",
  //     starting_chunk: "Falador Farm",
  //     yt_channel_name: "SnowCreator",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "VarlmorChunk",
  //     starting_chunk: "Sunrise Palace",
  //     yt_channel_name: "KrakWithaK",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Vexx Chunker",
  //     starting_chunk: "Burthorpe",
  //     yt_channel_name: "ThatVexxx7",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },
  //   {
  //     osrs_username: "Wizham07",
  //     starting_chunk: "Lumbridge (F2P)  ",
  //     yt_channel_name: "wizham07",
  //     yt_channel_link: "https://www.youtube.com/@PiatsaThunderHorn",
  //     ruleset: "Vanilla/Casual",
  //   },

  //   {
  //     osrs_username: "0degrees0min",
  //     starting_chunk: "Observatory",
  //     yt_channel_name: "Damekage",
  //     yt_channel_link: "https://www.youtube.com/@Damekage",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "AldarinChunk",
  //     starting_chunk: "Aldarin",
  //     yt_channel_name: "LucasSerious",
  //     yt_channel_link: "https://www.youtube.com/@Lucas_Serious",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "AloneinEdge",
  //     starting_chunk: "Edgeville",
  //     yt_channel_name: "EtnomisOsrs",
  //     yt_channel_link: "https://www.youtube.com/@etnomisosrs6030",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Alpaca Chunk",
  //     starting_chunk: "Sunset Coast",
  //     yt_channel_name: "AlpacaChunk",
  //     yt_channel_link: "https://www.youtube.com/@AlpacaChunk",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Ardy Chunky",
  //     starting_chunk: "Ardougne Market",
  //     yt_channel_name: "Eclipse RS",
  //     yt_channel_link: "https://www.youtube.com/@Eclipse-RS",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Ardy Enjoyer",
  //     starting_chunk: "Ardougne Market",
  //     yt_channel_name: "Ram Sice",
  //     yt_channel_link: "https://www.youtube.com/@RamSice",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Ba Chunk Man",
  //     starting_chunk: "Barbarian Assault",
  //     yt_channel_name: "BA Chunk Man",
  //     yt_channel_link: "https://www.youtube.com/@BaChunkMan",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Barb Chunk",
  //     starting_chunk: "Barbarian Village",
  //     yt_channel_name: "Kostrello",
  //     yt_channel_link: "https://www.youtube.com/@Kostrello/featured",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "BingusChunk",
  //     starting_chunk: "East Falador",
  //     yt_channel_name: "Bingus Gaming",
  //     yt_channel_link: "https://www.youtube.com/@bingusgaming7575",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "BiS Chunk",
  //     starting_chunk: "Hunter Guild",
  //     yt_channel_name: "Folayyy",
  //     yt_channel_link: "https://www.youtube.com/@Folayyy",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "CanifisChunk",
  //     starting_chunk: "Canifis",
  //     yt_channel_name: "FrayRS",
  //     yt_channel_link: "https://www.youtube.com/@FrayRS",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "CatherbyChnk",
  //     starting_chunk: "Catherby",
  //     yt_channel_name: "FruitSalad",
  //     yt_channel_link: "https://www.youtube.com/@FruitsaladOSRS",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "ChartChunks",
  //     starting_chunk: "Land's End",
  //     yt_channel_name: "DisabledOddish",
  //     yt_channel_link: "https://www.youtube.com/@DisabledOddish",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Chunk Danny",
  //     starting_chunk: "Edgeville",
  //     yt_channel_name: "ChunkDanny",
  //     yt_channel_link: "https://www.youtube.com/@ShespinRS",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Chunk Danny",
  //     starting_chunk: "Edgeville",
  //     yt_channel_name: "DannyTTV",
  //     yt_channel_link: "https://www.youtube.com/@xDannyTTV",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Chunk Li",
  //     starting_chunk: "Edgeville",
  //     yt_channel_name: "Frosty Bard",
  //     yt_channel_link: "https://www.youtube.com/@FrostyBard",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Chunk Zeah",
  //     starting_chunk: "Hosidius",
  //     yt_channel_name: "ChunkZeah",
  //     yt_channel_link: "https://www.youtube.com/@ChunkZeah",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Chunk5arim",
  //     starting_chunk: "Port Sarim",
  //     yt_channel_name: "Ordo",
  //     yt_channel_link: "https://www.youtube.com/@OrdoOSRS",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Chunkimedes",
  //     starting_chunk: "Fortis East",
  //     yt_channel_name: "Chunkimedes",
  //     yt_channel_link: "https://www.youtube.com/@Chunkimedes",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "ChunkNewb",
  //     starting_chunk: "Wizard Tower",
  //     yt_channel_name: "NotMeta Osrs",
  //     yt_channel_link: "https://www.youtube.com/@notmetaosrs",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "ChunkVellir",
  //     starting_chunk: "Barbarian Village",
  //     yt_channel_name: "Skeldoor",
  //     yt_channel_link: "https://www.youtube.com/@Skeldoor",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "ChunkVolcano",
  //     starting_chunk: "Brimhaven/Volcano",
  //     yt_channel_name: "Tellacon",
  //     yt_channel_link: "https://www.youtube.com/@Tellacon",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "ChunkWellArd",
  //     starting_chunk: "Ardougne Market",
  //     yt_channel_name: "QuadrupleD",
  //     yt_channel_link: "https://www.youtube.com/@QuadrupleD-osrs",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Chunky Verf",
  //     starting_chunk: "Kourend Castle",
  //     yt_channel_name: "VerfRS",
  //     yt_channel_link: "https://www.youtube.com/@VerfRS",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "ChunkYanille",
  //     starting_chunk: "Yanille",
  //     yt_channel_name: "JoshIsntGaming",
  //     yt_channel_link: "https://www.youtube.com/@JoshIsnt",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "ChunkyBroski",
  //     starting_chunk: "Camelot Castle",
  //     yt_channel_name: "LSDBroski",
  //     yt_channel_link: "https://www.youtube.com/@LSDbroski",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "ChunkyThorpe",
  //     starting_chunk: "Burthorpe",
  //     yt_channel_name: "MarcRS",
  //     yt_channel_link: "https://www.youtube.com/@MarcRSYT",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "ChunkyTree 4",
  //     starting_chunk: "Fortis Bazaar",
  //     yt_channel_name: "Zalat",
  //     yt_channel_link: "https://www.youtube.com/@RealZalat",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Count Drizzy",
  //     starting_chunk: "Draynor Manor",
  //     yt_channel_name: "WasabiScape",
  //     yt_channel_link: "https://www.youtube.com/@Wasabicrackerscape",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Cox Chunk",
  //     starting_chunk: "Chambers of Xeric",
  //     yt_channel_name: "Agile Tom",
  //     yt_channel_link: "https://www.youtube.com/@Agile_Tom",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Darth Chunk",
  //     starting_chunk: "West Brimhaven",
  //     yt_channel_name: "DarthChunk",
  //     yt_channel_link: "https://www.youtube.com/@DarthChunk",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Deagin Chunk",
  //     starting_chunk: "Barbarian Village",
  //     yt_channel_name: "Deagin",
  //     yt_channel_link: "https://www.youtube.com/@Deagin",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Eagles Chunk",
  //     starting_chunk: "Eagle's Peak",
  //     yt_channel_name: "Eagles Chunk",
  //     yt_channel_link: "https://www.youtube.com/@EaglesChunk",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "ErikEntrana",
  //     starting_chunk: "Entrana",
  //     yt_channel_name: "Erik Entrana",
  //     yt_channel_link: "https://www.youtube.com/@ErikEntrana",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "FremmyChunk",
  //     starting_chunk: "Rellekka",
  //     yt_channel_name: "Maden044",
  //     yt_channel_link: "https://www.youtube.com/@Madden044",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "FunChunkMan",
  //     starting_chunk: "Melzar's Maze",
  //     yt_channel_name: "FunChunkMan",
  //     yt_channel_link: "https://www.youtube.com/@funchunkman",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Ghost Chunk",
  //     starting_chunk: "Fishing Guild",
  //     yt_channel_name: "Ghost Chunk",
  //     yt_channel_link: "https://www.youtube.com/@GhostChunk232",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Goblin Chunk",
  //     starting_chunk: "Goblin Village",
  //     yt_channel_name: "GoblinChunk",
  //     yt_channel_link: "https://www.youtube.com/@GoblinChunk",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Gothicc Bae",
  //     starting_chunk: "Al Kharid",
  //     yt_channel_name: "Anika",
  //     yt_channel_link: "https://www.youtube.com/@gothicbae",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "JoeIsChunk",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "Joe Is Hardcore",
  //     yt_channel_link: "https://www.youtube.com/@JoeisHC",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "MapSquareUIM",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "Happery",
  //     yt_channel_link: "https://www.youtube.com/@Happery",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Mazed Out",
  //     starting_chunk: "Gnome Tree Village",
  //     yt_channel_name: "ShmichaelT",
  //     yt_channel_link: "https://www.youtube.com/@ShmichaelT",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "MT Chunk",
  //     starting_chunk: "Burthorpe",
  //     yt_channel_name: "MountainManRS",
  //     yt_channel_link: "https://www.youtube.com/@MountainManRS",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "OneChunkUp",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "Limpwurt",
  //     yt_channel_link: "https://www.youtube.com/@Limpwurt",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "PirateChunky",
  //     starting_chunk: "Port Sarim",
  //     yt_channel_name: "BlackAxon",
  //     yt_channel_link: "https://www.youtube.com/@BlackAxon",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Prif Chunk",
  //     starting_chunk: "Prifddinas",
  //     yt_channel_name: "ClubsRS",
  //     yt_channel_link: "https://www.youtube.com/@ClubsRS",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "RandmChunker",
  //     starting_chunk: "West Falador",
  //     yt_channel_name: "GrizzlyRPG",
  //     yt_channel_link: "https://www.youtube.com/@grizzlyrpg4661",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Rellekker",
  //     starting_chunk: "Rellekka",
  //     yt_channel_name: "Lunitar",
  //     yt_channel_link: "https://www.youtube.com/@lunitarosrs",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Ron Ralos",
  //     starting_chunk: "Ralos' Rise",
  //     yt_channel_name: "StankyRS",
  //     yt_channel_link: "https://www.youtube.com/@StankyRS",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "SailingChunk",
  //     starting_chunk: "Port Sarim",
  //     yt_channel_name: "BrewScape",
  //     yt_channel_link: "https://www.youtube.com/@BrewScape",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Schportis",
  //     starting_chunk: "Fortis West Bank",
  //     yt_channel_name: "Schpune",
  //     yt_channel_link: "https://www.youtube.com/@Schpuners",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Sir Camelock",
  //     starting_chunk: "Camelot Castle",
  //     yt_channel_name: "Maikeru RS",
  //     yt_channel_link: "https://www.youtube.com/@MaikeruRS",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Soda Chunk",
  //     starting_chunk: "Tree Gnome Village",
  //     yt_channel_name: "Soda",
  //     yt_channel_link: "https://www.youtube.com/@OsrsSoda",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "SpeckledSpan",
  //     starting_chunk: "Grand Tree",
  //     yt_channel_name: "Metrognomer",
  //     yt_channel_link: "https://www.youtube.com/@Metrognomer",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Stoey Chunks",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "Stoey",
  //     yt_channel_link: "https://www.youtube.com/@Stoey_Chunks",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "TheMonkChunk",
  //     starting_chunk: "Edgeville Monastery",
  //     yt_channel_name: "BillyBulwark",
  //     yt_channel_link: "https://www.youtube.com/@billybulwark",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "ValteeChunk",
  //     starting_chunk: "West Catherby",
  //     yt_channel_name: "V4LTEE",
  //     yt_channel_link: "https://www.youtube.com/@V4LTEE",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "w306 Rat",
  //     starting_chunk: "Barbarian Assault",
  //     yt_channel_name: "Mimb",
  //     yt_channel_link: "https://www.youtube.com/@Mimb3",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Xtreme Cove",
  //     starting_chunk: "Corsair Cove",
  //     yt_channel_name: "Impling Only",
  //     yt_channel_link: "https://www.youtube.com/@ImplingOnly",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "XtremeUnkah",
  //     starting_chunk: "Ruins of Unkah",
  //     yt_channel_name: "DaSauceMan",
  //     yt_channel_link: "https://www.youtube.com/@DSM-Gaming",
  //     ruleset: "Extreme",
  //   },
  //   {
  //     osrs_username: "Xtrme Gnome",
  //     starting_chunk: "Grand Tree",
  //     yt_channel_name: "Extreme Gnome",
  //     yt_channel_link: "https://www.youtube.com/@ExtremeGnome",
  //     ruleset: "Extreme",
  //   },

  //   {
  //     osrs_username: "BuzStrutYear",
  //     starting_chunk: "East Falador",
  //     yt_channel_name: "GrindyearOSRS",
  //     yt_channel_link: "https://www.youtube.com/@GrindyearOSRS",
  //     ruleset: "Supreme",
  //   },
  //   {
  //     osrs_username: "Chunkeronii",
  //     starting_chunk: "Fishing Trawler",
  //     yt_channel_name: "Armadillo Ninja",
  //     yt_channel_link: "https://www.youtube.com/@DilloTheNinja",
  //     ruleset: "Supreme",
  //   },
  //   {
  //     osrs_username: "FalaDaddy",
  //     starting_chunk: "West Falador",
  //     yt_channel_name: "BuzRS",
  //     yt_channel_link: "http://buzrsw.youtube.com/@BuzRS",
  //     ruleset: "Supreme",
  //   },
  //   {
  //     osrs_username: "Ham Of Molch",
  //     starting_chunk: "Lake Molch",
  //     yt_channel_name: "Ham Mold",
  //     yt_channel_link: "https://www.youtube.com/@HamOfMolch",
  //     ruleset: "Supreme",
  //   },
  //   {
  //     osrs_username: "LockedTK",
  //     starting_chunk: "Edgeville",
  //     yt_channel_name: "TurothKing",
  //     yt_channel_link: "https://www.youtube.com/@turothking",
  //     ruleset: "Supreme",
  //   },
  //   {
  //     osrs_username: "SeerSupreme",
  //     starting_chunk: "Seers",
  //     yt_channel_name: "Hannibal",
  //     yt_channel_link: "https://www.youtube.com/@OSRSHannibal",
  //     ruleset: "Supreme",
  //   },
  //   {
  //     osrs_username: "SuperiorBarb",
  //     starting_chunk: "Barbarian Assault",
  //     yt_channel_name: "BatDadSloth",
  //     yt_channel_link: "https://www.youtube.com/@batdadsloth4889",
  //     ruleset: "Supreme",
  //   },

  //   {
  //     osrs_username: "Chunk Evil",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "Chunk Evil",
  //     yt_channel_link: "https://www.youtube.com/@ChunkEvil",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "Chunk Quest",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "Fanatic",
  //     yt_channel_link: "https://www.youtube.com/@FanaticOSRS",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "Col Chunk",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "Lightstrung",
  //     yt_channel_link: "https://www.youtube.com/@lightstrung",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "f2chunkflip",
  //     starting_chunk: "Mudskipper Point",
  //     yt_channel_name: "Finalben7",
  //     yt_channel_link: "https://www.youtube.com/@finalben7",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "Farmadiller",
  //     starting_chunk: "Draynor Village",
  //     yt_channel_name: "Armadillo Ninja",
  //     yt_channel_link: "https://www.youtube.com/@DilloTheNinja",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "Gather Chunks",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "WillfulMike",
  //     yt_channel_link: "https://www.youtube.com/@Willfulmike",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "Makker",
  //     starting_chunk: "Castle Wars",
  //     yt_channel_name: "Makker",
  //     yt_channel_link: "https://www.youtube.com/@makker5709",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "Mooses Bar",
  //     starting_chunk: "Varrock Square",
  //     yt_channel_name: "Atamo",
  //     yt_channel_link: "https://www.youtube.com/@AtamoOS",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "Nolan Dere",
  //     starting_chunk: "West Ardougne",
  //     yt_channel_name: "Simga",
  //     yt_channel_link: "https://www.youtube.com/@SimgaPmP",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "PikkuChunk & ChunkyJontti",
  //     starting_chunk: "Draynor Village",
  //     yt_channel_name: "Pikkufighter",
  //     yt_channel_link: "https://www.youtube.com/@Pikkufighter",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "Quad Quester",
  //     starting_chunk: "Ardougne Monastery",
  //     yt_channel_name: "Quadruple D",
  //     yt_channel_link: "https://www.youtube.com/@QuadrupleD-osrs",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "SaekeaS",
  //     starting_chunk: "Isle of Souls",
  //     yt_channel_name: "SaekeaS",
  //     yt_channel_link: "https://www.youtube.com/@SaekeaS",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "ShiftyChunks",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "Shifty OSRS",
  //     yt_channel_link: "https://www.youtube.com/@Shifty-osrs",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "XtremeTwin",
  //     starting_chunk: "Lumbridge",
  //     yt_channel_name: "What If Rune",
  //     yt_channel_link: "https://www.youtube.com/@WhatIfRune",
  //     ruleset: "Specialized",
  //   },
  //   {
  //     osrs_username: "Zone Zoomer",
  //     starting_chunk: "Rimmington",
  //     yt_channel_name: "Ectograss",
  //     yt_channel_link: "https://www.youtube.com/@Ectograss",
  //     ruleset: "Specialized",
  //   },
  // ];

  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chunkers`, {method: 'GET'})
  //   const chunkers = await res.json()
  //   console.log("CHUNKERS", chunkers)

  // console.log("DB", db.chunkers);

  const chunkers = await db.chunker.findMany({
    orderBy: { createdAt: "desc" },
  });

  const addChunkers = async () => {
    "use server";
    console.log("ADDING CHUNKERS");
    await db.chunker.createMany({
      data: [
        {
          slug: "buzrs",
          yt_channel_id: "BuzRS",
          yt_channel_name: "BuzRS",
          published: true,
          osrs_username: "FalaDaddy",
          ruleset: "Supreme",
          starting_chunk: "West Falador",
          yt_subscriber_count: 16600,
        },
        {
          slug: "extreme-gnome",
          yt_channel_id: "ExtremeGnome",
          yt_channel_name: "Extreme Gnome",
          published: true,
          osrs_username: "Xtrme Gnome",
          ruleset: "Extreme",
          starting_chunk: "Grand Tree",
          yt_subscriber_count: 9470,
        },
        {
          slug: "saekeas",
          yt_channel_id: "SaekeaS",
          yt_channel_name: "SaekeaS",
          published: true,
          osrs_username: "SaekeaS",
          ruleset: "Specialized",
          starting_chunk: "Isle of Souls",
          yt_subscriber_count: 16600,
        },
        {
          slug: "limpwurt",
          yt_channel_id: "Limpwurt",
          yt_channel_name: "Limpwurt",
          published: true,
          osrs_username: "OneChunkUp",
          ruleset: "Extreme",
          starting_chunk: "Lumbridge",
          yt_subscriber_count: 3770,
        },
        {
          slug: "frayrs",
          yt_channel_id: "FrayRS",
          yt_channel_name: "Fray",
          published: true,
          osrs_username: "CanifisChunk",
          ruleset: "Extreme",
          starting_chunk: "Canifis",
          yt_subscriber_count: 45100,
        },
        {
          slug: "agile-tom",
          yt_channel_id: "Agile_Tom",
          yt_channel_name: "Agile Tom",
          published: true,
          osrs_username: "Cox Chunk",
          ruleset: "Extreme",
          starting_chunk: "Chambers of Xeric",
          yt_subscriber_count: 13900,
        },
        {
          slug: "hannibal",
          yt_channel_id: "OSRSHannibal",
          yt_channel_name: "Hannibal",
          published: true,
          osrs_username: "SeerSupreme",
          ruleset: "Supreme",
          starting_chunk: "Seers",
          yt_subscriber_count: 8150,
        },
        {
          slug: "inoox",
          yt_channel_id: "inoox",
          yt_channel_name: "Inoox",
          published: true,
          osrs_username: "Ardychunky",
          ruleset: "Vanilla/Casual",
          starting_chunk: "Ardougne Market",
          yt_subscriber_count: 3690,
        },
        {
          slug: "slay-brother",
          yt_channel_id: "SlayBrother",
          yt_channel_name: "Slay Brother",
          published: true,
          osrs_username: "Chunkus Lad",
          ruleset: "Vanilla/Casual",
          starting_chunk: "Lumbridge",
          yt_subscriber_count: 31000,
        },
        {
          slug: "fanasticosrs",
          yt_channel_id: "FanaticOSRS",
          yt_channel_name: "FanaticOSRS",
          published: true,
          osrs_username: "Chunk Quest",
          ruleset: "Specialized",
          starting_chunk: "Lumbridge",
          yt_subscriber_count: 1020,
        },
      ],
    });
    revalidatePath("/");
  };

  return (
    <main className="w-full p-5">
      <h1>Browse OSRS Chunk Locked Creators</h1>

      {chunkers.map((chunker) => (
        <div key={chunker.id}>{chunker.osrs_username}</div>
      ))}

      <Button onClick={addChunkers}>Add Chunkers</Button>
      {/* <h1>OSRS Chunk Locked YouTube Series</h1>

      <h2>Extreme</h2>
      <table className="w-full">
        <tbody>
          <tr>
            <th>OSRS Username</th>
            <th>Starting Chunk</th>
            <th>YouTube Channel Name</th>
          </tr>
          {chunkers
            .filter((chunker) => chunker.ruleset === "Extreme")
            .map((chunker) => (
              <tr key={chunker.yt_channel_name}>
                <td>
                  <Link
                    href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker.osrs_username}`}
                  >
                    {chunker.osrs_username}
                  </Link>
                </td>
                <td>{chunker.starting_chunk}</td>
                <td>
                  <Link href={chunker.yt_channel_link}>
                    {chunker.yt_channel_name}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Vanilla/Casual</h2>
      <table className="w-full">
        <tbody>
          <tr>
            <th>OSRS Username</th>
            <th>Starting Chunk</th>
            <th>YouTube Channel Name</th>
          </tr>
          {chunkers
            .filter((chunker) => chunker.ruleset === "Vanilla/Casual")
            .map((chunker) => (
              <tr key={chunker.yt_channel_name}>
                <td>
                  <Link
                    href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker.osrs_username}`}
                  >
                    {chunker.osrs_username}
                  </Link>
                </td>
                <td>{chunker.starting_chunk}</td>
                <td>
                  <Link href={chunker.yt_channel_link}>
                    {chunker.yt_channel_name}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Supreme</h2>
      <table className="w-full">
        <tbody>
          <tr>
            <th>OSRS Username</th>
            <th>Starting Chunk</th>
            <th>YouTube Channel Name</th>
          </tr>
          {chunkers
            .filter((chunker) => chunker.ruleset === "Supreme")
            .map((chunker) => (
              <tr key={chunker.yt_channel_name}>
                <td>
                  <Link
                    href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker.osrs_username}`}
                  >
                    {chunker.osrs_username}
                  </Link>
                </td>
                <td>{chunker.starting_chunk}</td>
                <td>
                  <Link href={chunker.yt_channel_link}>
                    {chunker.yt_channel_name}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Specialized</h2>
      <table className="w-full">
        <tbody>
          <tr>
            <th>OSRS Username</th>
            <th>Starting Chunk</th>
            <th>YouTube Channel Name</th>
          </tr>
          {chunkers
            .filter((chunker) => chunker.ruleset === "Specialized")
            .map((chunker) => (
              <tr key={chunker.yt_channel_name}>
                <td>
                  <Link
                    href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker.osrs_username}`}
                  >
                    {chunker.osrs_username}
                  </Link>
                </td>
                <td>{chunker.starting_chunk}</td>
                <td>
                  <Link href={chunker.yt_channel_link}>
                    {chunker.yt_channel_name}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table> */}
    </main>
  );
}
